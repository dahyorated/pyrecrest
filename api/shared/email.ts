import sgMail from "@sendgrid/mail";
import { Booking, BankDetails } from "./types";

function initSendGrid(): { fromEmail: string; adminEmail: string } {
  const apiKey = process.env.SENDGRID_API_KEY || "";
  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY environment variable is not set");
  }
  sgMail.setApiKey(apiKey);

  // SENDGRID_FROM_EMAIL must be a verified sender in SendGrid
  // (via Single Sender Verification or Domain Authentication).
  // This is separate from ADMIN_EMAIL which receives notifications.
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || "";
  if (!fromEmail) {
    throw new Error(
      "SENDGRID_FROM_EMAIL environment variable is not set. " +
      "Set this to your SendGrid verified sender email address."
    );
  }

  return {
    fromEmail,
    adminEmail: process.env.ADMIN_EMAIL || "",
  };
}

export async function sendBookingConfirmationEmail(
  booking: Booking,
  bankDetails: BankDetails
): Promise<void> {
  const { fromEmail, adminEmail } = initSendGrid();

  const msg = {
    to: booking.guestEmail,
    from: fromEmail,
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
              <p>Please make payment within <strong>30 minutes</strong> to confirm your booking. After 30 minutes, your reservation will be automatically released.</p>
              <p><strong>Bank Name:</strong> ${bankDetails.bankName}</p>
              <p><strong>Account Name:</strong> ${bankDetails.accountName}</p>
              <p><strong>Account Number:</strong> ${bankDetails.accountNumber}</p>
              <p><strong>Amount:</strong> ₦${booking.total.toLocaleString()}</p>
              <p><strong>Reference:</strong> ${booking.bookingReference}</p>
            </div>

            <p><strong>Important:</strong> After making payment, please send your payment confirmation to ${adminEmail || fromEmail} with your booking reference.</p>

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
  const { fromEmail, adminEmail } = initSendGrid();

  if (!adminEmail) {
    console.error("ADMIN_EMAIL environment variable is not set, skipping admin notification");
    return;
  }

  const msg = {
    to: adminEmail,
    from: fromEmail,
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

export async function sendPaymentConfirmedEmail(booking: Booking): Promise<void> {
  const { fromEmail } = initSendGrid();

  const msg = {
    to: booking.guestEmail,
    from: fromEmail,
    subject: `Payment Confirmed - ${booking.bookingReference}`,
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
          .confirmed-badge { background-color: #d4edda; color: #155724; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #28a745; text-align: center; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .highlight { color: #284498; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Pyrecrest</h1>
            <p>Payment Confirmed</p>
          </div>

          <div class="content">
            <p>Dear ${booking.guestName},</p>

            <div class="confirmed-badge">
              <h2>Your Booking is Confirmed!</h2>
              <p>We have received your payment and your reservation is now secured.</p>
            </div>

            <div class="booking-details">
              <h3>Booking Details</h3>
              <p><strong>Booking Reference:</strong> <span class="highlight">${booking.bookingReference}</span></p>
              <p><strong>Check-in:</strong> ${new Date(booking.checkIn as string).toLocaleDateString('en-GB')}</p>
              <p><strong>Check-out:</strong> ${new Date(booking.checkOut as string).toLocaleDateString('en-GB')}</p>
              <p><strong>Nights:</strong> ${booking.nights}</p>
              <p><strong>Guests:</strong> ${booking.guestCount}</p>
              <p><strong>Total Paid:</strong> ₦${Number(booking.total).toLocaleString()}</p>
            </div>

            <p>We look forward to welcoming you! If you have any questions before your stay, please don't hesitate to contact us.</p>

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
    console.log(`Payment confirmed email sent to ${booking.guestEmail}`);
  } catch (error) {
    console.error("Error sending payment confirmed email:", error);
    throw error;
  }
}

export async function sendAdminApprovalEmail(
  adminName: string,
  adminEmail: string,
  approvalToken: string
): Promise<void> {
  const { fromEmail } = initSendGrid();

  const frontendUrl = process.env.FRONTEND_URL || "https://www.pyrecrest.com";
  const approvalLink = `${frontendUrl}/api/ApproveAdmin?token=${approvalToken}`;

  const msg = {
    to: "pyrecrestng@gmail.com",
    from: fromEmail,
    subject: `New Admin Signup Request - ${adminName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #284498; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f7f7f7; }
          .admin-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 8px; }
          .approve-btn { display: inline-block; background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Pyrecrest</h1>
            <p>New Admin Approval Request</p>
          </div>
          <div class="content">
            <p>A new admin has requested access to the Pyrecrest dashboard:</p>
            <div class="admin-details">
              <p><strong>Name:</strong> ${adminName}</p>
              <p><strong>Email:</strong> ${adminEmail}</p>
            </div>
            <p>Click the button below to approve this admin:</p>
            <a href="${approvalLink}" class="approve-btn">Approve Admin</a>
            <p style="color: #666; font-size: 12px;">This link expires in 24 hours. If you did not expect this request, you can safely ignore this email.</p>
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
    console.log(`Admin approval email sent for ${adminEmail}`);
  } catch (error) {
    console.error("Error sending admin approval email:", error);
    throw error;
  }
}
