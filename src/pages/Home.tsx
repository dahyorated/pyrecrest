import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function Home() {
  const features = [
    {
      icon: '🏠',
      title: 'Premium Apartments',
      description: 'Luxuriously furnished with top-tier amenities',
      gradient: 'from-amber-700 to-amber-900'
    },
    {
      icon: '📍',
      title: 'Prime Locations',
      description: 'Strategic locations in the heart of Lagos',
      gradient: 'from-amber-800 to-yellow-700'
    },
    {
      icon: '🛡️',
      title: 'Safe & Secure',
      description: '24/7 security with CCTV surveillance',
      gradient: 'from-stone-600 to-stone-800'
    },
    {
      icon: '💎',
      title: 'Affordable Luxury',
      description: 'Premium quality at competitive rates',
      gradient: 'from-yellow-700 to-amber-800'
    },
  ];

  const testimonials = [
    {
      name: 'Chioma Adeyemi',
      role: 'Business Traveler',
      rating: 5,
      text: 'Absolutely stunning! The apartment exceeded all my expectations. Modern, clean, and perfectly located. Will definitely book again!',
      avatar: 'CA',
      color: 'from-amber-600 to-amber-800'
    },
    {
      name: 'David Okon',
      role: 'Remote Worker',
      rating: 5,
      text: 'Perfect for my month-long stay. Lightning-fast WiFi, comfortable workspace, and the host was incredibly responsive. Highly recommended!',
      avatar: 'DO',
      color: 'from-stone-500 to-stone-700'
    },
    {
      name: 'Sarah Johnson',
      role: 'Vacation Visitor',
      rating: 5,
      text: 'Felt like a luxury hotel but with the comfort of home. Beautiful decor, excellent amenities, and fantastic value for money!',
      avatar: 'SJ',
      color: 'from-yellow-600 to-yellow-800'
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/banner.jpg)' }}
          ></div>
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-primary-900/80 to-black/85"></div>
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQtMi42ODYtNi02LTZzLTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2IDYtMi42ODYgNi02ek0wIDBoNjB2NjBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-slide-down">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  <span className="text-amber-400">New Age Solutions</span><br />
                  For Smart Real Estate
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto text-balance">
                  Pyrecrest provides innovative access to premium real estate solutions.
                  Experience seamless service, modern living, and exceptional hospitality in Lagos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <a
                  href="https://leo.pyrecrest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 gradient-accent text-gray-900 rounded-2xl font-bold text-lg shadow-glow hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Explore Our Shortlet
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
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
                  { number: '1', label: 'Premium Property', suffix: '', icon: '🏢' },
                  { number: '20', label: 'Happy Guests', suffix: '+', icon: '😊' },
                  { number: '4.9', label: 'Average Rating', suffix: '/5', icon: '⭐' },
                  { number: '24', label: 'Hour Support', suffix: '/7', icon: '🔧' },
                ].map((stat, index) => (
                  <div key={index} className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border-2 border-primary-100 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                    <div className="text-2xl mb-3">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                      {stat.number}{stat.suffix}
                    </div>
                    <div className="text-sm text-gray-700 font-semibold uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 right-20 w-20 h-20 bg-amber-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-10 w-32 h-32 bg-amber-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
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

        {/* Testimonials Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900"></div>
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
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC0zLjMxNC0yLjY4Ni02LTYtNnMtNiAyLjY4Ni02IDYgMi42ODYgNiA2IDYgNi0yLjY4NiA2LTZ6TTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

          <div className="container relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Book Your Perfect Stay?
              </h2>
              <p className="text-xl text-gray-800 mb-10">
                Experience comfort and luxury at affordable rates. Visit LEO by Pyrecrest for our premium shortlet apartments.
              </p>
              <a
                href="https://leo.pyrecrest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-2xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
              >
                Visit LEO by Pyrecrest
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
