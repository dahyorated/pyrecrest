import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getBookingsClient } from "../shared/tableStorage";

export async function updateBooking(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("UpdateBooking function processing request");

  if (request.method === "OPTIONS") {
    return {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    };
  }

  try {
    // TODO: Add authentication check

    const { rowKey, status, paymentStatus } = await request.json() as any;

    if (!rowKey) {
      return {
        status: 400,
        jsonBody: { error: "Booking ID is required" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    const bookingsClient = await getBookingsClient();

    // Fetch the booking
    const booking = await bookingsClient.getEntity("BOOKING", rowKey);

    // Update status
    const updates: any = {};
    if (status) updates.status = status;
    if (paymentStatus) updates.paymentStatus = paymentStatus;

    if (Object.keys(updates).length === 0) {
      return {
        status: 400,
        jsonBody: { error: "No updates provided" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    await bookingsClient.updateEntity({ ...booking, ...updates }, "Merge");

    return {
      status: 200,
      jsonBody: { success: true, message: "Booking updated successfully" },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (error) {
    context.log("Error updating booking:", error);
    return {
      status: 500,
      jsonBody: { error: "Failed to update booking" },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
}

app.http('UpdateBooking', {
  methods: ['PUT', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'UpdateBooking',
  handler: updateBooking,
});
