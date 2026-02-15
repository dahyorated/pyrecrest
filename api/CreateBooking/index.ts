import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import {
  getBookingsClient,
  getBlockedDatesClient,
  generateBookingReference,
  generateRowKey,
} from "../shared/tableStorage";
import { sendBookingConfirmationEmail, sendAdminNotificationEmail } from "../shared/email";
import { CreateBookingRequest, CreateBookingResponse, Booking, BankDetails } from "../shared/types";

export async function createBooking(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("CreateBooking function processing request");

  // Handle OPTIONS request for CORS
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
    const bookingRequest: CreateBookingRequest = await request.json() as CreateBookingRequest;

    // Validate request
    if (
      !bookingRequest ||
      !bookingRequest.propertyId ||
      !bookingRequest.checkIn ||
      !bookingRequest.checkOut ||
      !bookingRequest.guestDetails
    ) {
      return {
        status: 400,
        jsonBody: { error: "Missing required booking information" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    const { propertyId, checkIn, checkOut, guestDetails, specialRequests } = bookingRequest;

    // Validate guest details
    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone || !guestDetails.guestCount) {
      return {
        status: 400,
        jsonBody: { error: "Missing required guest information" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return {
        status: 400,
        jsonBody: { error: "Check-in date cannot be in the past" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    if (checkOutDate <= checkInDate) {
      return {
        status: 400,
        jsonBody: { error: "Check-out date must be after check-in date" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    // Calculate nights
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

    // Check availability (query existing bookings for overlaps)
    const bookingsClient = getBookingsClient();
    const blockedDatesClient = getBlockedDatesClient();

    // Query bookings that overlap with requested dates
    const bookingsIter = bookingsClient.listEntities({
      queryOptions: {
        filter: `PartitionKey eq 'BOOKING' and propertyId eq '${propertyId}' and (status eq 'confirmed' or status eq 'pending_payment')`,
      },
    });

    for await (const booking of bookingsIter) {
      const bookingCheckIn = new Date(booking.checkIn as string);
      const bookingCheckOut = new Date(booking.checkOut as string);

      // Check for date overlap
      if (checkInDate < bookingCheckOut && checkOutDate > bookingCheckIn) {
        return {
          status: 409,
          jsonBody: { error: "These dates are not available. Please select different dates." },
          headers: { "Access-Control-Allow-Origin": "*" },
        };
      }
    }

    // Check for blocked dates
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
          status: 409,
          jsonBody: { error: "These dates are blocked. Please select different dates." },
          headers: { "Access-Control-Allow-Origin": "*" },
        };
      }
    }

    // Calculate pricing (for now, use hardcoded values - can fetch from properties table later)
    const basePrice = 15000; // ₦15,000 per night
    const cleaningFee = 5000; // ₦5,000
    const subtotal = basePrice * nights;
    const total = subtotal + cleaningFee;

    // Generate booking reference and ID
    const bookingReference = generateBookingReference();
    const rowKey = generateRowKey();

    // Create booking entity
    const booking: Booking = {
      partitionKey: "BOOKING",
      rowKey: rowKey,
      bookingReference: bookingReference,
      propertyId: propertyId,
      status: "pending_payment",
      guestName: guestDetails.name,
      guestEmail: guestDetails.email,
      guestPhone: guestDetails.phone,
      guestCount: guestDetails.guestCount,
      checkIn: checkIn,
      checkOut: checkOut,
      nights: nights,
      basePrice: basePrice,
      total: total,
      paymentStatus: "pending",
      paymentMethod: "bank_transfer",
      specialRequests: specialRequests,
      createdAt: new Date().toISOString(),
    };

    // Save to Azure Table Storage
    await bookingsClient.createEntity(booking);

    context.log(`Booking created: ${bookingReference}`);

    // Get bank details from environment variables
    const bankDetails: BankDetails = {
      accountName: process.env.BANK_ACCOUNT_NAME || "Pyrecrest Limited",
      accountNumber: process.env.BANK_ACCOUNT_NUMBER || "1234567890",
      bankName: process.env.BANK_NAME || "GTBank",
    };

    // Send confirmation emails
    try {
      await sendBookingConfirmationEmail(booking, bankDetails);
      await sendAdminNotificationEmail(booking);
    } catch (emailError) {
      context.log("Error sending emails:", emailError);
      // Don't fail the booking if email fails
    }

    // Return response with booking details and bank info
    const response: CreateBookingResponse = {
      success: true,
      bookingId: rowKey,
      bookingReference: bookingReference,
      bookingDetails: booking,
      bankDetails: bankDetails,
    };

    return {
      status: 201,
      jsonBody: response,
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (error) {
    context.log("Error creating booking:", error);
    return {
      status: 500,
      jsonBody: { error: "An error occurred while creating your booking. Please try again." },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
}

app.http('CreateBooking', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'CreateBooking',
  handler: createBooking,
});
