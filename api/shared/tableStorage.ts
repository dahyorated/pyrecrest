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

export function initializeTableClients() {
  try {
    const connectionString = getConnectionString();
    propertiesClient = TableClient.fromConnectionString(connectionString, "properties");
    bookingsClient = TableClient.fromConnectionString(connectionString, "bookings");
    blockedDatesClient = TableClient.fromConnectionString(connectionString, "blockedDates");
    settingsClient = TableClient.fromConnectionString(connectionString, "settings");
  } catch (error) {
    console.error("Error initializing table clients:", error);
  }
}

// Create tables if they don't exist
export async function createTablesIfNotExist() {
  try {
    await propertiesClient.createTable();
    await bookingsClient.createTable();
    await blockedDatesClient.createTable();
    await settingsClient.createTable();
    console.log("Tables created or already exist");
  } catch (error) {
    // Tables likely already exist
    console.log("Tables initialization check complete");
  }
}

// Export table clients
export function getPropertiesClient(): TableClient {
  if (!propertiesClient) initializeTableClients();
  return propertiesClient;
}

export function getBookingsClient(): TableClient {
  if (!bookingsClient) initializeTableClients();
  return bookingsClient;
}

export function getBlockedDatesClient(): TableClient {
  if (!blockedDatesClient) initializeTableClients();
  return blockedDatesClient;
}

export function getSettingsClient(): TableClient {
  if (!settingsClient) initializeTableClients();
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
