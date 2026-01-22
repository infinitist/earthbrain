
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Memorial', path: '/memorial' },
    { name: 'Philosophy', path: '/philosophy' },
    { name: 'Bio', path: '/bio' },
    { name: 'Members', path: '/members' },
    { name: 'Support', path: '/support' },
    { name: 'Archive', path: '/archive' },
  ];

  // Immersive pages have banners and need transparent navbars at the top
  const isImmersive = ['/', '/memorial', '/philosophy', '/bio', '/members', '/archive', '/support'].includes(location.pathname);

  const navbarBackgroundClass = (isScrolled || !isImmersive)
    ? 'bg-emerald-950 shadow-xl py-3 border-b border-emerald-900'
    : 'bg-transparent py-5 border-b border-transparent';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navbarBackgroundClass}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-amber-500 rounded-full group-hover:bg-amber-400 transition-all duration-500 shadow-xl group-hover:rotate-[360deg] transform">
            <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-emerald-950" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" d="M3.6 9h16.8M3.6 15h16.8" />
              <path strokeLinecap="round" d="M12 3a30 30 0 0 0 0 18M12 3a30 30 0 0 1 0 18" />
              <circle cx="12" cy="12" r="2.5" className="animate-pulse" />
            </svg>
          </div>

          <span className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wider group-hover:text-amber-400 transition-colors">
            Our Earth Brain
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] font-bold tracking-[0.25em] uppercase transition-all flex items-center gap-2 hover:text-amber-400 ${location.pathname === link.path ? 'text-amber-400' : 'text-white'
                }`}
            >
              {link.name === 'Support' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {link.name}
            </Link>
          ))}
          <Link
            to="/memorial"
            className="bg-amber-500 hover:bg-amber-400 text-emerald-950 px-7 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            RSVP
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-emerald-950 border-t border-emerald-900 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-5 p-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif text-2xl tracking-wide transition-colors ${location.pathname === link.path ? 'text-amber-400' : 'text-white'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/memorial"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-amber-500 text-emerald-950 px-6 py-4 rounded-xl text-center font-black uppercase tracking-[0.2em] shadow-lg"
              >
                Confirm RSVP
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
