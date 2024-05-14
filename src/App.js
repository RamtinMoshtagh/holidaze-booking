// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/HomePage';
import Venues from './components/pages/VenuesPage';
import Login from './components/pages/LoginPage';
import Admin from './components/pages/AdminPage';
import Register from './services/Register';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
