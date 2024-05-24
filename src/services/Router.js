import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ProfilePage from '../components/pages/ProfilePage';
import { AuthProvider } from '../components/hooks/AuthContext';
import ProtectedRoute from '../utils/ProtectedRoute';

/**
 * The main application component with routing.
 * @returns {JSX.Element} The application component.
 */
const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
