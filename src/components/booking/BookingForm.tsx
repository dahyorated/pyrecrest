import { useState } from 'react';
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
  useState(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setNights(diffDays);
        const basePrice = 15000;
        const cleaningFee = 5000;
        setTotalPrice(basePrice * diffDays + cleaningFee);
      }
    }
  });

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
        // Navigate to confirmation page with booking data
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

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="text-3xl font-bold text-primary">
          ₦15,000 <span className="text-lg font-normal text-gray-600">/ night</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Minimum stay: 2 nights</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Check-in"
            min={today}
            {...register('checkIn', {
              required: 'Check-in date is required',
            })}
            error={errors.checkIn?.message}
          />
          <Input
            type="date"
            label="Check-out"
            min={checkIn || today}
            {...register('checkOut', {
              required: 'Check-out date is required',
            })}
            error={errors.checkOut?.message}
          />
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>₦15,000 × {nights} nights</span>
              <span>₦{(15000 * nights).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cleaning fee</span>
              <span>₦5,000</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Guest Details */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-900 mb-4">Guest Information</h3>

          <div className="space-y-4">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Early check-in, extra pillows, etc."
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="accent"
          fullWidth
          size="lg"
          disabled={isSubmitting || nights < 2}
        >
          {isSubmitting ? 'Processing...' : nights < 2 ? 'Select Dates (Min 2 Nights)' : 'Reserve'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          You won't be charged yet. Pay via bank transfer after booking.
        </p>
      </form>
    </Card>
  );
}
