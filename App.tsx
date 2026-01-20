
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Memorial from './pages/Memorial';
import Archive from './pages/Archive';
import Philosophy from './pages/Philosophy';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memorial" element={<Memorial />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
