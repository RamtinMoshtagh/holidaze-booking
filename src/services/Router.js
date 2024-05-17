import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import { AuthProvider } from './hooks/AuthContext';

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
