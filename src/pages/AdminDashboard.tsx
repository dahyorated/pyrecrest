import { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

interface Booking {
  rowKey: string;
  bookingReference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/GetBookings');
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (rowKey: string, status: string, paymentStatus?: string) => {
    try {
      await fetch('/api/UpdateBooking', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rowKey, status, paymentStatus }),
      });
      fetchBookings(); // Refresh
      alert('Booking updated successfully!');
    } catch (error) {
      alert('Failed to update booking');
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'pending') return b.status === 'pending_payment';
    if (filter === 'confirmed') return b.status === 'confirmed';
    if (filter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending_payment').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    revenue: bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.total, 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Pyrecrest Admin Dashboard</h1>
          <p className="text-gray-200">Manage your bookings and properties</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-gray-600 text-sm mb-2">Total Bookings</div>
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
          </Card>
          <Card className="p-6">
            <div className="text-gray-600 text-sm mb-2">Pending Payment</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </Card>
          <Card className="p-6">
            <div className="text-gray-600 text-sm mb-2">Confirmed</div>
            <div className="text-3xl font-bold text-green-600">{stats.confirmed}</div>
          </Card>
          <Card className="p-6">
            <div className="text-gray-600 text-sm mb-2">Total Revenue</div>
            <div className="text-3xl font-bold text-accent">₦{stats.revenue.toLocaleString()}</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex gap-4">
            <Button
              variant={filter === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilter('all')}
            >
              All ({stats.total})
            </Button>
            <Button
              variant={filter === 'pending' ? 'primary' : 'secondary'}
              onClick={() => setFilter('pending')}
            >
              Pending ({stats.pending})
            </Button>
            <Button
              variant={filter === 'confirmed' ? 'primary' : 'secondary'}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed ({stats.confirmed})
            </Button>
          </div>
        </Card>

        {/* Bookings Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ref</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.rowKey} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-primary">{booking.bookingReference}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{booking.guestName}</div>
                        <div className="text-sm text-gray-500">{booking.guestEmail}</div>
                        <div className="text-sm text-gray-500">{booking.guestPhone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{new Date(booking.checkIn).toLocaleDateString('en-GB')}</div>
                        <div className="text-sm text-gray-500">
                          to {new Date(booking.checkOut).toLocaleDateString('en-GB')}
                        </div>
                        <div className="text-sm text-gray-500">{booking.nights} nights</div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ₦{booking.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status.replace('_', ' ')}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Payment: {booking.paymentStatus}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === 'pending_payment' && (
                          <button
                            onClick={() => updateBookingStatus(booking.rowKey, 'confirmed', 'paid')}
                            className="text-sm text-green-600 hover:text-green-800 font-medium"
                          >
                            Confirm Payment
                          </button>
                        )}
                        {booking.status === 'confirmed' && (
                          <span className="text-sm text-gray-500">Confirmed ✓</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
