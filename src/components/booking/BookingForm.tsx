import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCount: number;
  specialRequests?: string;
}

export default function BookingForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>();

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  // Calculate nights and price when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setNights(diffDays);
        const basePrice = 65000;
        const cleaningFee = 5000;
        const subtotal = basePrice * diffDays + cleaningFee;
        const vat = subtotal * 0.075; // 7.5% VAT
        setTotalPrice(subtotal + vat);
      } else {
        setNights(0);
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut]);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/CreateBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: 'apartment-001',
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          guestDetails: {
            name: data.guestName,
            email: data.guestEmail,
            phone: data.guestPhone,
            guestCount: data.guestCount,
          },
          specialRequests: data.specialRequests,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        navigate('/booking-confirmation', {
          state: {
            booking: result.bookingDetails,
            bankDetails: result.bankDetails,
            bookingReference: result.bookingReference,
          },
        });
      } else {
        alert(result.error || 'Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="p-8 sticky top-28">
      <div className="mb-8">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-accent-400 to-accent-600 text-gray-900 rounded-full text-sm font-bold mb-4">
          ⭐ Best Value
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-bold gradient-text">₦65,000</span>
          <span className="text-xl text-gray-600">/ night</span>
        </div>
        <p className="text-sm text-gray-500">Minimum stay: 2 nights</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Dates Section */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Select Dates
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Check-in</label>
              <input
                type="date"
                min={today}
                {...register('checkIn', {
                  required: 'Check-in date is required',
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900 font-medium"
              />
              {errors.checkIn && (
                <p className="mt-1 text-xs text-red-500">{errors.checkIn.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Check-out</label>
              <input
                type="date"
                min={checkIn || today}
                {...register('checkOut', {
                  required: 'Check-out date is required',
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900 font-medium"
              />
              {errors.checkOut && (
                <p className="mt-1 text-xs text-red-500">{errors.checkOut.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 rounded-2xl space-y-3 border-2 border-primary-100">
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>₦65,000 × {nights} nights</span>
              <span>₦{(65000 * nights).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>Cleaning fee</span>
              <span>₦5,000</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>VAT (7.5%)</span>
              <span>₦{((65000 * nights + 5000) * 0.075).toLocaleString()}</span>
            </div>
            <div className="border-t-2 border-primary-200 pt-3 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold gradient-text">₦{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Guest Details */}
        {nights >= 2 && (
          <div className="space-y-4 pt-6 border-t-2 border-gray-100">
            <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm">Guest Information</h3>

            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              {...register('guestName', {
                required: 'Name is required',
              })}
              error={errors.guestName?.message}
            />

            <Input
              type="email"
              label="Email"
              placeholder="john@example.com"
              {...register('guestEmail', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.guestEmail?.message}
            />

            <Input
              type="tel"
              label="Phone"
              placeholder="+234 800 000 0000"
              {...register('guestPhone', {
                required: 'Phone number is required',
              })}
              error={errors.guestPhone?.message}
            />

            <Input
              type="number"
              label="Number of Guests"
              min="1"
              max="2"
              defaultValue="1"
              {...register('guestCount', {
                required: 'Guest count is required',
                min: { value: 1, message: 'At least 1 guest required' },
                max: { value: 2, message: 'Maximum 2 guests allowed' },
              })}
              error={errors.guestCount?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                {...register('specialRequests')}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="Early check-in, extra pillows, etc."
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="accent"
          fullWidth
          size="lg"
          disabled={isSubmitting || nights < 2}
          className="font-bold text-lg shadow-glow"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : nights < 2 ? (
            'Select Dates (Min 2 Nights)'
          ) : nights >= 2 && !checkIn ? (
            'Select Check-in Date'
          ) : nights >= 2 && !checkOut ? (
            'Select Check-out Date'
          ) : (
            <>Reserve Now →</>
          )}
        </Button>

        {nights >= 2 && (
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            🔒 Secure booking · No payment now · Pay via bank transfer after confirmation
          </p>
        )}
      </form>
    </Card>
  );
}
