import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import { AuthProvider } from './components/hooks/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Venues from './components/pages/VenuesPage';
import VenueDetails from './components/pages/VenueDetails';
import Login from './components/pages/LoginPage';
import Register from './components/pages/RegisterPage';
import Admin from './components/pages/AdminPage';
import ProfilePage from './components/pages/ProfilePage';
import ProtectedRoute from './utils/ProtectedRoute';
import RoleBasedRoute from './utils/RoleBasedRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyles />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/register" />} />
            <Route path="/venues" element={<ProtectedRoute><Venues /></ProtectedRoute>} />
            <Route path="/venues/:id" element={<ProtectedRoute><VenueDetails /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<RoleBasedRoute requiredRole="venueManager"><Admin /></RoleBasedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
