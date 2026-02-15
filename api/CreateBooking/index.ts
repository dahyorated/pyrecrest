import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  getBookingsClient,
  getBlockedDatesClient,
  generateBookingReference,
  generateRowKey,
} from "../shared/tableStorage";
import { sendBookingConfirmationEmail, sendAdminNotificationEmail } from "../shared/email";
import { CreateBookingRequest, CreateBookingResponse, Booking, BankDetails } from "../shared/types";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("CreateBooking function processing request");

  // Set CORS headers
  context.res = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  };

  // Handle OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    context.res.status = 200;
    return;
  }

  try {
    const bookingRequest: CreateBookingRequest = req.body;

    // Validate request
    if (
      !bookingRequest ||
      !bookingRequest.propertyId ||
      !bookingRequest.checkIn ||
      !bookingRequest.checkOut ||
      !bookingRequest.guestDetails
    ) {
      context.res = {
        status: 400,
        body: { error: "Missing required booking information" },
      };
      return;
    }

    const { propertyId, checkIn, checkOut, guestDetails, specialRequests } = bookingRequest;

    // Validate guest details
    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone || !guestDetails.guestCount) {
      context.res = {
        status: 400,
        body: { error: "Missing required guest information" },
      };
      return;
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      context.res = {
        status: 400,
        body: { error: "Check-in date cannot be in the past" },
      };
      return;
    }

    if (checkOutDate <= checkInDate) {
      context.res = {
        status: 400,
        body: { error: "Check-out date must be after check-in date" },
      };
      return;
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
        context.res = {
          status: 409,
          body: { error: "These dates are not available. Please select different dates." },
        };
        return;
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
        context.res = {
          status: 409,
          body: { error: "These dates are blocked. Please select different dates." },
        };
        return;
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
      context.log.error("Error sending emails:", emailError);
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

    context.res = {
      status: 201,
      body: response,
    };
  } catch (error) {
    context.log.error("Error creating booking:", error);
    context.res = {
      status: 500,
      body: { error: "An error occurred while creating your booking. Please try again." },
    };
  }
};

export default httpTrigger;
