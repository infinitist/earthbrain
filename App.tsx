import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Memorial from './pages/Memorial';
import Archive from './pages/Archive';
import Philosophy from './pages/Philosophy';
import Admin from './pages/Admin';
import Bio from './pages/Bio';
import Members from './pages/Members';
import Support from './pages/Support';
import { db } from './src/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AuthProvider } from './context/AuthContext';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/memorial" element={<Memorial />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/support" element={<Support />} />
          <Route path="/members" element={<Members />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const logVisit = async () => {
      const visited = sessionStorage.getItem('earthbrain_visited');
      if (!visited) {
        try {
          await addDoc(collection(db, 'analytics_visits'), {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
          });
          sessionStorage.setItem('earthbrain_visited', 'true');
        } catch (err) {
          console.error("Error logging visit", err);
        }
      }
    };
    logVisit();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
