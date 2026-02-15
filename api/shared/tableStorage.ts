import { TableClient, AzureNamedKeyCredential, TableEntity } from "@azure/data-tables";

// Initialize Table Clients
let propertiesClient: TableClient;
let bookingsClient: TableClient;
let blockedDatesClient: TableClient;
let settingsClient: TableClient;

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

// Clients are initialized lazily via getXxxClient() functions
