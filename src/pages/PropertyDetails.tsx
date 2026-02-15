import { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import BookingForm from '../components/booking/BookingForm';

export default function PropertyDetails() {
  const [selectedImage, setSelectedImage] = useState(0);

  // Placeholder images - replace with actual property photos
  const images = [
    { id: 1, alt: 'Living Room' },
    { id: 2, alt: 'Bedroom' },
    { id: 3, alt: 'Kitchen' },
    { id: 4, alt: 'Bathroom' },
  ];

  const amenities = [
    { icon: '📶', name: 'High-Speed WiFi' },
    { icon: '❄️', name: 'Air Conditioning' },
    { icon: '🍳', name: 'Fully Equipped Kitchen' },
    { icon: '📺', name: 'Smart TV with Netflix' },
    { icon: '🚿', name: 'Hot Shower' },
    { icon: '⚡', name: 'Backup Power' },
    { icon: '🚗', name: 'Free Parking' },
    { icon: '🛡️', name: '24/7 Security' },
    { icon: '🧺', name: 'Washing Machine' },
    { icon: '🌐', name: 'Work Desk' },
    { icon: '☕', name: 'Coffee Maker' },
    { icon: '🔑', name: 'Self Check-in' },
  ];

  const houseRules = [
    'Check-in: 2:00 PM',
    'Check-out: 12:00 PM',
    'No smoking',
    'No pets',
    'No parties or events',
    'Quiet hours: 10 PM - 7 AM',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-sm text-gray-600">
              <a href="/" className="hover:text-primary">Home</a>
              <span className="mx-2">/</span>
              <a href="/properties" className="hover:text-primary">Properties</a>
              <span className="mx-2">/</span>
              <span className="text-primary font-medium">Luxury 1-Bedroom Apartment</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Property Title */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Luxury 1-Bedroom Serviced Apartment
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Lagos, Nigeria
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                5.0 (12 reviews)
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card>
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 aspect-video flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🏢</div>
                    <p className="text-gray-700 font-medium">
                      Professional photos coming soon
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Image {selectedImage + 1} of {images.length}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-4">
                  {images.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center text-2xl ${
                        selectedImage === index ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      🏢
                    </button>
                  ))}
                </div>
              </Card>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-primary mb-4">About This Property</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    Welcome to our beautiful 1-bedroom serviced apartment, your perfect home away from home in Lagos.
                    This modern and stylishly furnished apartment offers everything you need for a comfortable stay,
                    whether you're here for business or leisure.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Located in a prime area with easy access to major business districts, shopping centers, and
                    entertainment venues. The apartment features a spacious living area, a fully equipped kitchen,
                    and a comfortable bedroom with a queen-size bed.
                  </p>
                  <p className="text-gray-600">
                    Enjoy round-the-clock security, reliable power supply, and high-speed internet connectivity.
                    Perfect for solo travelers, couples, or business professionals seeking a comfortable and
                    convenient accommodation.
                  </p>
                </div>
              </Card>

              {/* Amenities */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-primary mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-2xl">{amenity.icon}</span>
                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* House Rules */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-primary mb-4">House Rules</h2>
                <ul className="space-y-2">
                  {houseRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
