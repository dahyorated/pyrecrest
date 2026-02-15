import { useLocation, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function BookingConfirmation() {
  const location = useLocation();
  const { booking, bankDetails, bookingReference, emailSent, emailError } = location.state || {};

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Card className="p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Booking Found</h2>
            <p className="text-gray-600 mb-6">
              Unable to load booking confirmation. Please try booking again.
            </p>
            <Link to="/property/apartment-001">
              <Button variant="primary">Back to Property</Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Booking Received!
            </h1>
            <p className="text-lg text-gray-600">
              Your booking reference is: <span className="font-bold text-accent">{bookingReference}</span>
            </p>
          </div>

          {/* Important Notice */}
          <Card className="p-6 bg-yellow-50 border-2 border-accent mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Payment Required</h3>
                <p className="text-gray-700">
                  Please complete payment within 24 hours to confirm your booking.
                  Your reservation is currently pending payment confirmation.
                </p>
              </div>
            </div>
          </Card>

          {/* Booking Details */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Booking Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Stay Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">{new Date(booking.checkIn).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">{new Date(booking.checkOut).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nights:</span>
                    <span className="font-medium">{booking.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">{booking.guestCount}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Guest Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{booking.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{booking.guestEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{booking.guestPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-2">Special Requests</h3>
                <p className="text-gray-600 text-sm">{booking.specialRequests}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">₦{booking.total.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Bank Transfer Details */}
          <Card className="p-6 bg-primary-50 border-2 border-primary">
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h2 className="text-xl font-bold text-primary mb-2">Bank Transfer Details</h2>
                <p className="text-gray-700 text-sm mb-4">
                  Make payment to the account below and send confirmation to confirm@pyrecrest.com
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg space-y-4">
              <div>
                <label className="text-sm text-gray-600">Bank Name</label>
                <p className="font-bold text-lg text-gray-900">{bankDetails.bankName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Account Name</label>
                <p className="font-bold text-lg text-gray-900">{bankDetails.accountName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Account Number</label>
                <p className="font-bold text-2xl text-primary">{bankDetails.accountNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Amount</label>
                <p className="font-bold text-2xl text-accent">₦{booking.total.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Payment Reference</label>
                <p className="font-bold text-lg text-gray-900">{bookingReference}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> Please include your booking reference ({bookingReference})
                in the transfer narration or send proof of payment to confirm@pyrecrest.com
              </p>
            </div>
          </Card>

          {/* Confirmation Email Notice */}
          <Card className={`p-6 mt-6 ${emailSent === false ? 'border-2 border-red-300 bg-red-50' : ''}`}>
            <div className="flex items-start gap-3">
              <svg className={`w-6 h-6 flex-shrink-0 mt-0.5 ${emailSent === false ? 'text-red-500' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                {emailSent === false ? (
                  <>
                    <h3 className="font-semibold text-red-800 mb-2">Email Could Not Be Sent</h3>
                    <p className="text-red-700 text-sm">
                      We were unable to send a confirmation email to <strong>{booking.guestEmail}</strong>.
                      Please save this page or take a screenshot of your booking details above.
                    </p>
                    {emailError && (
                      <p className="text-red-600 text-xs mt-2 font-mono bg-red-100 p-2 rounded">
                        Debug: {emailError}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-gray-900 mb-2">Email Confirmation Sent</h3>
                    <p className="text-gray-600 text-sm">
                      A confirmation email with your booking details and bank account information
                      has been sent to <strong>{booking.guestEmail}</strong>. Please check your inbox
                      (and spam folder if needed).
                    </p>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/" className="flex-1">
              <Button variant="secondary" fullWidth>
                Back to Home
              </Button>
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1"
            >
              <Button variant="primary" fullWidth>
                Print Confirmation
              </Button>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
