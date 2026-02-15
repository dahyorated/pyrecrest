import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function Home() {
  const features = [
    {
      icon: '🏠',
      title: 'Premium Apartments',
      description: 'Luxuriously furnished with top-tier amenities',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: '📍',
      title: 'Prime Locations',
      description: 'Strategic locations in the heart of Lagos',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: '🛡️',
      title: 'Safe & Secure',
      description: '24/7 security with CCTV surveillance',
      gradient: 'from-pink-500 to-red-600'
    },
    {
      icon: '💎',
      title: 'Affordable Luxury',
      description: 'Premium quality at competitive rates',
      gradient: 'from-yellow-500 to-orange-600'
    },
  ];

  const amenities = [
    { icon: '📶', name: 'High-Speed WiFi' },
    { icon: '❄️', name: 'Air Conditioning' },
    { icon: '🍳', name: 'Full Kitchen' },
    { icon: '📺', name: 'Smart TV' },
    { icon: '🚿', name: 'Hot Shower' },
    { icon: '⚡', name: 'Backup Power' },
    { icon: '🚗', name: 'Free Parking' },
    { icon: '🔒', name: '24/7 Security' },
  ];

  const testimonials = [
    {
      name: 'Chioma Adeyemi',
      role: 'Business Traveler',
      rating: 5,
      text: 'Absolutely stunning! The apartment exceeded all my expectations. Modern, clean, and perfectly located. Will definitely book again!',
      avatar: 'CA',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'David Okon',
      role: 'Remote Worker',
      rating: 5,
      text: 'Perfect for my month-long stay. Lightning-fast WiFi, comfortable workspace, and the host was incredibly responsive. Highly recommended!',
      avatar: 'DO',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Sarah Johnson',
      role: 'Vacation Visitor',
      rating: 5,
      text: 'Felt like a luxury hotel but with the comfort of home. Beautiful decor, excellent amenities, and fantastic value for money!',
      avatar: 'SJ',
      color: 'from-pink-400 to-pink-600'
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 gradient-primary"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQtMi42ODYtNi02LTZzLTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2IDYtMi42ODYgNi02ek0wIDBoNjB2NjBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-slide-down">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Your <span className="text-accent-400">Premium</span> Home<br />
                  Away From Home
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto text-balance">
                  Experience luxury and comfort in our fully serviced short-let apartments.
                  Perfect for business trips, vacations, or extended stays in Lagos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link
                  to="/property/apartment-001"
                  className="group px-8 py-4 gradient-accent text-gray-900 rounded-2xl font-bold text-lg shadow-glow hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Explore Property
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
                {[
                  { number: '1', label: 'Premium Property', suffix: '' },
                  { number: '100', label: 'Happy Guests', suffix: '+' },
                  { number: '4.9', label: 'Average Rating', suffix: '/5' },
                  { number: '24', label: 'Hour Support', suffix: '/7' },
                ].map((stat, index) => (
                  <div key={index} className="glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-1">
                      {stat.number}{stat.suffix}
                    </div>
                    <div className="text-sm text-gray-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 right-20 w-20 h-20 bg-accent-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative">
          <div className="container">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Why Choose Pyrecrest?</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We provide more than just accommodation – we offer an experience of comfort, security, and luxury
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl p-8 shadow-soft hover:shadow-hover card-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Property Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Featured Property</span>
              </h2>
              <p className="text-gray-600 text-lg">Our luxury 1-bedroom apartment</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl shadow-hover overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Property Image */}
                  <div className="relative h-80 lg:h-auto bg-gradient-to-br from-primary-100 via-primary-200 to-accent-100 flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative text-center p-8 z-10">
                      <div className="text-8xl mb-4 animate-float">🏢</div>
                      <p className="text-gray-700 font-semibold text-lg">
                        Professional photos coming soon
                      </p>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-10">
                    <div className="inline-block px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold mb-4">
                      ⭐ Premium Choice
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Luxury 1-Bedroom Apartment
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      Experience modern living in our beautifully furnished apartment.
                      Perfect for couples or solo travelers seeking comfort and style.
                    </p>

                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-semibold">1 Bedroom</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-semibold">Max 2 Guests</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {amenities.slice(0, 6).map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-xl px-4 py-2">
                          <span className="text-xl">{amenity.icon}</span>
                          <span className="text-sm font-medium">{amenity.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end justify-between mb-8">
                      <div>
                        <div className="text-4xl font-bold gradient-text mb-1">
                          ₦15,000
                        </div>
                        <p className="text-gray-500">per night · Min 2 nights</p>
                      </div>
                      <div className="flex items-center gap-1 text-accent-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/property/apartment-001"
                      className="block w-full px-8 py-4 gradient-accent text-gray-900 rounded-2xl font-bold text-center shadow-md hover:shadow-glow transform hover:scale-105 transition-all duration-300"
                    >
                      Book This Property
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQtMi42ODYtNi02LTZzLTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2IDYtMi42ODYgNi02ek0wIDBoNjB2NjBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                What Our Guests Say
              </h2>
              <p className="text-gray-200 text-lg">Real experiences from real people</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="glass rounded-3xl p-8 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-300">{testimonial.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-200 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-accent-400 via-accent-500 to-accent-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC0zLjMxNC0yLjY4Ni02LTYtNnMtNiAyLjY4Ni02IDYgMi42ODYgNiA2IDYgNi0yLjY4NiA2LTZ6TTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

          <div className="container relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Book Your Perfect Stay?
              </h2>
              <p className="text-xl text-gray-800 mb-10">
                Experience comfort and luxury at affordable rates. Book now and enjoy your perfect home away from home.
              </p>
              <Link
                to="/property/apartment-001"
                className="inline-block px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-2xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
              >
                Book Now →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
