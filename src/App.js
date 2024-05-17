import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/hooks/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/HomePage';
import Venues from './components/pages/VenuesPage';
import VenueDetails from './components/pages/VenueDetails'; // Make sure this is correctly imported
import Login from './components/pages/LoginPage';
import Register from './components/pages/RegisterPage';
import Admin from './components/pages/AdminPage';
import ProfilePage from './components/pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venues/:id" element={<VenueDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
