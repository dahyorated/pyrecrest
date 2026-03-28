import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPropertiesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-soft'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <Logo className="h-12 transform group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>

            {/* Properties Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setPropertiesOpen(!propertiesOpen)}
                className="px-4 py-2 text-gray-900 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-200 font-semibold inline-flex items-center gap-1"
              >
                Properties
                <svg className={`w-4 h-4 transition-transform duration-200 ${propertiesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {propertiesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-hover border border-gray-100 overflow-hidden animate-slide-down">
                  <a
                    href="https://leo.pyrecrest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-4 hover:bg-primary-50 transition-colors"
                    onClick={() => setPropertiesOpen(false)}
                  >
                    <span className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-lg">🏢</span>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">LEO by Pyrecrest</div>
                      <div className="text-xs text-gray-500">Luxury shortlet apartments</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <a
              href="https://leo.pyrecrest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-3 gradient-accent text-gray-900 rounded-full font-bold shadow-md hover:shadow-glow transform hover:scale-105 transition-all duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-2 pt-4">
            <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <a
              href="https://leo.pyrecrest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 text-gray-900 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 font-semibold flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>LEO by Pyrecrest</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <MobileNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </MobileNavLink>
            <a
              href="https://leo.pyrecrest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 gradient-accent text-gray-900 rounded-xl font-bold text-center shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 text-gray-900 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-200 font-semibold"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  to,
  onClick,
  children
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="px-4 py-3 text-gray-900 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 font-semibold"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
