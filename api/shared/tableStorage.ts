import { TableClient, AzureNamedKeyCredential, TableEntity } from "@azure/data-tables";
import * as bcrypt from "bcryptjs";

// Initialize Table Clients
let propertiesClient: TableClient;
let bookingsClient: TableClient;
let blockedDatesClient: TableClient;
let settingsClient: TableClient;
let adminsClient: TableClient;

function getConnectionString(): string {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING environment variable is not set");
  }
  return connectionString;
}

function initializeTableClients(): void {
  const connectionString = getConnectionString();
  propertiesClient = TableClient.fromConnectionString(connectionString, "properties");
  bookingsClient = TableClient.fromConnectionString(connectionString, "bookings");
  blockedDatesClient = TableClient.fromConnectionString(connectionString, "blockedDates");
  settingsClient = TableClient.fromConnectionString(connectionString, "settings");
  adminsClient = TableClient.fromConnectionString(connectionString, "admins");
}

// Ensure a table exists before first use
async function ensureTable(client: TableClient): Promise<void> {
  try {
    await client.createTable();
  } catch (error: any) {
    // "TableAlreadyExists" is expected — ignore it
    if (error?.statusCode !== 409) {
      throw error;
    }
  }
}

// Export table clients (lazy init + auto-create table)
export async function getPropertiesClient(): Promise<TableClient> {
  if (!propertiesClient) initializeTableClients();
  await ensureTable(propertiesClient);
  return propertiesClient;
}

export async function getBookingsClient(): Promise<TableClient> {
  if (!bookingsClient) initializeTableClients();
  await ensureTable(bookingsClient);
  return bookingsClient;
}

export async function getBlockedDatesClient(): Promise<TableClient> {
  if (!blockedDatesClient) initializeTableClients();
  await ensureTable(blockedDatesClient);
  return blockedDatesClient;
}

export async function getSettingsClient(): Promise<TableClient> {
  if (!settingsClient) initializeTableClients();
  await ensureTable(settingsClient);
  return settingsClient;
}

export async function getAdminsClient(): Promise<TableClient> {
  if (!adminsClient) initializeTableClients();
  await ensureTable(adminsClient);
  return adminsClient;
}

// Helper function to generate booking reference
export function generateBookingReference(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PRC-${dateStr}-${random}`;
}

// Helper function to generate unique row key
export function generateRowKey(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Check if a pending_payment booking has expired and auto-cancel it
export async function cancelIfExpired(
  client: TableClient,
  booking: any
): Promise<boolean> {
  if (booking.status !== "pending_payment") {
    return false;
  }

  const expiresAt = booking.expiresAt as string | undefined;
  if (!expiresAt) {
    return false; // Legacy booking without expiresAt — leave it alone
  }

  if (new Date() > new Date(expiresAt)) {
    await client.updateEntity(
      {
        partitionKey: booking.partitionKey,
        rowKey: booking.rowKey,
        status: "cancelled",
        paymentStatus: "expired",
      },
      "Merge"
    );
    return true;
  }

  return false;
}

// Seed pre-approved admin accounts (runs once per cold start)
let adminsSeeded = false;

const SEED_ADMINS = [
  { name: "Ezekiel Ayanda", email: "ayandaezekiel@gmail.com", password: "Somolu2026!" },
  { name: "Bolu Balogun", email: "bolubalog@gmail.com", password: "Somolu2026!" },
];

export async function seedAdmins(): Promise<void> {
  if (adminsSeeded) return;
  adminsSeeded = true;

  const client = await getAdminsClient();

  for (const admin of SEED_ADMINS) {
    const existing = client.listEntities({
      queryOptions: {
        filter: `PartitionKey eq 'ADMIN' and email eq '${admin.email}'`,
      },
    });

    let found = false;
    for await (const _ of existing) {
      found = true;
      break;
    }

    if (!found) {
      const passwordHash = await bcrypt.hash(admin.password, 10);
      const rowKey = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      await client.createEntity({
        partitionKey: "ADMIN",
        rowKey,
        name: admin.name,
        email: admin.email,
        passwordHash,
        status: "approved",
        createdAt: new Date().toISOString(),
      });
    }
  }
}

// Clients are initialized lazily via getXxxClient() functions
