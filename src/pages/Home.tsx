import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function Home() {
  const features = [
    { icon: '🏠', title: 'Premium Apartments', description: 'Luxuriously furnished with modern amenities' },
    { icon: '📍', title: 'Prime Locations', description: 'Conveniently located in the heart of Lagos' },
    { icon: '🛡️', title: 'Safe & Secure', description: '24/7 security and CCTV surveillance' },
    { icon: '💎', title: 'Affordable Luxury', description: 'Competitive rates without compromising quality' },
  ];

  const amenities = [
    'High-Speed WiFi',
    'Air Conditioning',
    'Fully Equipped Kitchen',
    'Smart TV',
    'Hot Shower',
    'Backup Power',
    'Free Parking',
    '24/7 Support',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary-700 text-white py-20 md:py-32">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Your Premium Home Away From Home
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                Experience luxury and comfort in our fully serviced short-let apartments.
                Perfect for business trips, vacations, or extended stays.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/property/apartment-001">
                  <Button variant="accent" size="lg">
                    View Our Property
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Why Choose Pyrecrest?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We provide more than just accommodation – we offer an experience of comfort, security, and luxury.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} hover className="text-center p-8">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Property Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Featured Property
              </h2>
              <p className="text-gray-600 text-lg">
                Our luxury 1-bedroom apartment
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Property Image */}
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 h-80 md:h-auto flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🏢</div>
                      <p className="text-gray-700 font-medium">
                        Professional photos coming soon
                      </p>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      Luxury 1-Bedroom Apartment
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Experience modern living in our beautifully furnished 1-bedroom apartment.
                      Perfect for couples or solo travelers seeking comfort and style.
                    </p>

                    <div className="mb-6">
                      <div className="flex items-center gap-4 text-gray-700 mb-2">
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          1 Bedroom
                        </span>
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Max 2 Guests
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="font-semibold text-gray-700 mb-3">Amenities:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {amenities.slice(0, 6).map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-3xl font-bold text-primary mb-2">
                        ₦15,000 <span className="text-lg font-normal text-gray-600">/ night</span>
                      </div>
                      <p className="text-sm text-gray-500">Minimum stay: 2 nights</p>
                    </div>

                    <Link to="/property/apartment-001">
                      <Button variant="accent" fullWidth size="lg">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                What Our Guests Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Chioma A.',
                  rating: 5,
                  text: 'Amazing experience! The apartment was spotless, beautifully furnished, and in a great location. Will definitely book again.',
                },
                {
                  name: 'David O.',
                  rating: 5,
                  text: 'Perfect for my business trip. Fast WiFi, comfortable bed, and excellent customer service. Highly recommended!',
                },
                {
                  name: 'Sarah M.',
                  rating: 5,
                  text: 'Felt like home! The apartment had everything I needed. The host was very responsive and helpful.',
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-1 mb-4 text-accent">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-primary">- {testimonial.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Book Your Stay?
            </h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Experience comfort and luxury at affordable rates. Book now and enjoy your perfect home away from home.
            </p>
            <Link to="/property/apartment-001">
              <Button variant="accent" size="lg">
                Book Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
