import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getBookingsClient, getBlockedDatesClient } from "../shared/tableStorage";

export async function checkAvailability(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("CheckAvailability function processing request");

  if (request.method === "OPTIONS") {
    return {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  try {
    const { propertyId, checkIn, checkOut } = await request.json() as any;

    if (!propertyId || !checkIn || !checkOut) {
      return {
        status: 400,
        jsonBody: { error: "Missing required parameters" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Check existing bookings
    const bookingsClient = getBookingsClient();
    const bookingsIter = bookingsClient.listEntities({
      queryOptions: {
        filter: `PartitionKey eq 'BOOKING' and propertyId eq '${propertyId}' and (status eq 'confirmed' or status eq 'pending_payment')`,
      },
    });

    for await (const booking of bookingsIter) {
      const bookingCheckIn = new Date(booking.checkIn as string);
      const bookingCheckOut = new Date(booking.checkOut as string);

      if (checkInDate < bookingCheckOut && checkOutDate > bookingCheckIn) {
        return {
          status: 200,
          jsonBody: { available: false, reason: "Dates already booked" },
          headers: { "Access-Control-Allow-Origin": "*" },
        };
      }
    }

    // Check blocked dates
    const blockedDatesClient = getBlockedDatesClient();
    const blockedIter = blockedDatesClient.listEntities({
      queryOptions: {
        filter: `PartitionKey eq 'BLOCKED' and propertyId eq '${propertyId}'`,
      },
    });

    for await (const blocked of blockedIter) {
      const blockedStart = new Date(blocked.startDate as string);
      const blockedEnd = new Date(blocked.endDate as string);

      if (checkInDate < blockedEnd && checkOutDate > blockedStart) {
        return {
          status: 200,
          jsonBody: { available: false, reason: "Dates are blocked" },
          headers: { "Access-Control-Allow-Origin": "*" },
        };
      }
    }

    return {
      status: 200,
      jsonBody: { available: true },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (error) {
    context.log("Error checking availability:", error);
    return {
      status: 500,
      jsonBody: { error: "Failed to check availability" },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
}

app.http('CheckAvailability', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'CheckAvailability',
  handler: checkAvailability,
});
