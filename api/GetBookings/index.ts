import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getBookingsClient, cancelIfExpired } from "../shared/tableStorage";
import { requireAuth } from "../shared/auth";

export async function getBookings(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("GetBookings function processing request");

  // Handle CORS
  if (request.method === "OPTIONS") {
    return {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    };
  }

  try {
    const auth = requireAuth(request);
    if (!auth.valid) return auth.response;

    const bookingsClient = await getBookingsClient();
    const bookings = [];

    // Fetch all bookings
    const bookingsIter = bookingsClient.listEntities({
      queryOptions: {
        filter: `PartitionKey eq 'BOOKING'`,
      },
    });

    for await (const booking of bookingsIter) {
      // Auto-cancel expired pending reservations so admin sees accurate statuses
      if (await cancelIfExpired(bookingsClient, booking)) {
        booking.status = "cancelled";
        booking.paymentStatus = "expired";
      }
      bookings.push(booking);
    }

    // Sort by creation date (newest first)
    bookings.sort((a, b) => {
      const dateA = new Date(a.createdAt as string).getTime();
      const dateB = new Date(b.createdAt as string).getTime();
      return dateB - dateA;
    });

    return {
      status: 200,
      jsonBody: { bookings },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (error) {
    context.log("Error fetching bookings:", error);
    return {
      status: 500,
      jsonBody: { error: "Failed to fetch bookings" },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
}

app.http('GetBookings', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'GetBookings',
  handler: getBookings,
});
