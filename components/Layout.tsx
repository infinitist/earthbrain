
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top whenever the path changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 bg-texture-leaf selection:bg-amber-200 selection:text-emerald-900">
      <Navbar />

      {/* Spacer for fixed navbar on subpages */}
      {!isHome && <div className="h-[74px]" aria-hidden="true" />}

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-emerald-950 text-white py-20 border-t border-emerald-900">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h3 className="font-serif text-4xl font-bold mb-6 text-amber-500">Our Earth Brain</h3>
            <p className="text-emerald-100/70 text-lg leading-relaxed max-w-md font-light">
              Sharing the insights, community projects, and health teachings of Krystina Poludnikiewicz. Dedicated to honest curiosity and the simple value of connecting with the world around us.
            </p>
            <div className="mt-8 flex space-x-4">
              <a href="https://www.youtube.com/@OurEarthBrain" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-amber-500 hover:text-emerald-950 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-amber-500 mb-8">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="text-emerald-100/60 hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/memorial" className="text-emerald-100/60 hover:text-amber-400 transition-colors">Memorial</Link></li>
              <li><Link to="/philosophy" className="text-emerald-100/60 hover:text-amber-400 transition-colors">Philosophy</Link></li>
              <li><Link to="/bio" className="text-emerald-100/60 hover:text-amber-400 transition-colors">Bio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-amber-500 mb-8">Community</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/members" className="text-emerald-100/60 hover:text-amber-400 transition-colors">Members</Link></li>
              <li><Link to="/archive" className="text-emerald-100/60 hover:text-amber-400 transition-colors">Archive</Link></li>
              <li><Link to="/support" className="text-emerald-100/60 hover:text-amber-400 transition-colors">Support</Link></li>
              <li><Link to="/admin" className="text-emerald-100/30 hover:text-amber-400 transition-colors text-[9px] uppercase tracking-widest">Organizer Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-20 pt-10 border-t border-emerald-900/50 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest uppercase text-emerald-500/50 gap-6">
          <p>&copy; {new Date().getFullYear()} Our Earth Brain Movement</p>
          <p className="italic font-serif normal-case tracking-normal text-sm text-emerald-400">"We are the organ through which the Earth reflects."</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
