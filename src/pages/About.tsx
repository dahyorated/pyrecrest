import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">
            About Pyrecrest
          </h1>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Story</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Welcome to Pyrecrest, your trusted partner for premium real estate solutions in Nigeria.
                We understand that finding the perfect accommodation can be challenging, especially when you're
                away from home. That's why we're committed to providing you with a comfortable, secure, and
                luxurious living experience.
              </p>
              <p className="text-gray-600 mb-4">
                Founded with a vision to redefine the real estate experience in Nigeria, Pyrecrest
                combines modern luxury with affordability. We believe that everyone deserves access to quality
                accommodation, whether for business or leisure.
              </p>
              <p className="text-gray-600 mb-4">
                Looking for a premium shortlet stay? Visit{' '}
                <a href="https://leo.pyrecrest.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                  LEO by Pyrecrest
                </a>{' '}
                for our luxury serviced apartments in Lagos.
              </p>
              <p className="text-gray-600">
                Our properties are strategically located, fully furnished, and equipped with all the amenities
                you need for a comfortable stay. From high-speed internet for remote work to fully equipped
                kitchens for home-cooked meals, we've thought of everything to make your experience memorable.
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-primary mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm">
                To provide exceptional real estate solutions that feel like home
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl mb-3">👁️</div>
              <h3 className="font-bold text-primary mb-2">Our Vision</h3>
              <p className="text-gray-600 text-sm">
                To be Nigeria's most trusted premium real estate provider
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-bold text-primary mb-2">Our Values</h3>
              <p className="text-gray-600 text-sm">
                Quality, Security, Comfort, and Customer Satisfaction
              </p>
            </Card>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Premium Quality', desc: 'High-quality furnishings and modern appliances' },
                { title: 'Prime Locations', desc: 'Easy access to business districts and attractions' },
                { title: 'Flexible Stays', desc: 'Whether it\'s a night or a month, we\'ve got you covered' },
                { title: '24/7 Support', desc: 'Our team is always available to assist you' },
                { title: 'Secure Payment', desc: 'Safe and convenient payment options' },
                { title: 'Verified Properties', desc: 'All our properties are vetted for quality and safety' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
