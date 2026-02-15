import sgMail from "@sendgrid/mail";
import { Booking, BankDetails } from "./types";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const FROM_EMAIL = process.env.ADMIN_EMAIL || "noreply@pyrecrest.com";

sgMail.setApiKey(SENDGRID_API_KEY);

export async function sendBookingConfirmationEmail(
  booking: Booking,
  bankDetails: BankDetails
): Promise<void> {
  const msg = {
    to: booking.guestEmail,
    from: FROM_EMAIL,
    subject: `Booking Confirmation - ${booking.bookingReference}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #284498; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f7f7f7; }
          .booking-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
          .bank-details { background-color: #fff3cd; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #FFC632; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .highlight { color: #284498; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Pyrecrest</h1>
            <p>Booking Confirmation</p>
          </div>

          <div class="content">
            <p>Dear ${booking.guestName},</p>

            <p>Thank you for booking with Pyrecrest! Your booking has been received.</p>

            <div class="booking-details">
              <h3>Booking Details</h3>
              <p><strong>Booking Reference:</strong> <span class="highlight">${booking.bookingReference}</span></p>
              <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString('en-GB')}</p>
              <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString('en-GB')}</p>
              <p><strong>Nights:</strong> ${booking.nights}</p>
              <p><strong>Guests:</strong> ${booking.guestCount}</p>
              <p><strong>Total Amount:</strong> ₦${booking.total.toLocaleString()}</p>
            </div>

            <div class="bank-details">
              <h3>⚠️ Payment Required</h3>
              <p>Please make payment within 24 hours to confirm your booking.</p>
              <p><strong>Bank Name:</strong> ${bankDetails.bankName}</p>
              <p><strong>Account Name:</strong> ${bankDetails.accountName}</p>
              <p><strong>Account Number:</strong> ${bankDetails.accountNumber}</p>
              <p><strong>Amount:</strong> ₦${booking.total.toLocaleString()}</p>
              <p><strong>Reference:</strong> ${booking.bookingReference}</p>
            </div>

            <p><strong>Important:</strong> After making payment, please send your payment confirmation to ${FROM_EMAIL} with your booking reference.</p>

            ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}

            <p>Your booking will be confirmed once we verify your payment.</p>

            <p>If you have any questions, please don't hesitate to contact us.</p>

            <p>Best regards,<br>The Pyrecrest Team</p>
          </div>

          <div class="footer">
            <p>&copy; 2026 Pyrecrest. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Confirmation email sent to ${booking.guestEmail}`);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
}

export async function sendAdminNotificationEmail(booking: Booking): Promise<void> {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

  const msg = {
    to: ADMIN_EMAIL,
    from: FROM_EMAIL,
    subject: `New Booking - ${booking.bookingReference}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #284498; color: white; padding: 20px; }
          .content { padding: 20px; }
          .booking-info { background-color: #f7f7f7; padding: 15px; margin: 15px 0; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎉 New Booking Received!</h2>
          </div>

          <div class="content">
            <div class="booking-info">
              <h3>Booking Details</h3>
              <p><strong>Reference:</strong> ${booking.bookingReference}</p>
              <p><strong>Guest:</strong> ${booking.guestName}</p>
              <p><strong>Email:</strong> ${booking.guestEmail}</p>
              <p><strong>Phone:</strong> ${booking.guestPhone}</p>
              <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString('en-GB')}</p>
              <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString('en-GB')}</p>
              <p><strong>Nights:</strong> ${booking.nights}</p>
              <p><strong>Guests:</strong> ${booking.guestCount}</p>
              <p><strong>Total:</strong> ₦${booking.total.toLocaleString()}</p>
              <p><strong>Status:</strong> Pending Payment</p>
              ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
            </div>

            <p>Please check your bank account for payment and update the booking status in the admin dashboard once confirmed.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Admin notification sent`);
  } catch (error) {
    console.error("Error sending admin notification:", error);
    // Don't throw - admin notification failure shouldn't block booking
  }
}
