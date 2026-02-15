export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-4">
        <div className="container">
          <h1 className="text-2xl font-bold">Pyrecrest</h1>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-20">
          <div className="container">
            <div className="max-w-3xl">
              <h2 className="text-5xl font-bold mb-6">
                Premium Shortlet Apartments in Nigeria
              </h2>
              <p className="text-xl mb-8 text-gray-100">
                Experience luxury and comfort in our fully serviced apartments. Perfect for business or leisure.
              </p>
              <button className="bg-accent hover:bg-accent-600 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </section>

        {/* Temporary content */}
        <section className="py-16">
          <div className="container">
            <h3 className="text-3xl font-bold text-primary mb-8">
              Welcome to Pyrecrest
            </h3>
            <p className="text-lg text-gray-700">
              Your website is being built. More content coming soon!
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container text-center">
          <p>&copy; 2026 Pyrecrest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
