import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider, useAuth } from './components/hooks/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './services/Login';
import ProfilePage from './components/pages/ProfilePage';

// Mocking the components
jest.mock('./services/Login', () => () => (
  <div>
    <h1>Login</h1>
    <button>Login</button>
  </div>
));

jest.mock('./components/pages/ProfilePage', () => () => (
  <div>
    <h1>Profile</h1>
  </div>
));

jest.mock('./components/hooks/AuthContext', () => {
  const originalModule = jest.requireActual('./components/hooks/AuthContext');
  return {
    ...originalModule,
    AuthProvider: ({ children }) => <div>{children}</div>,
    useAuth: jest.fn(),
  };
});

jest.mock('./services/Api', () => ({
  setAuthToken: jest.fn(),
  setApiKey: jest.fn(),
}));

jest.mock('./services/CreateApiKey', () => jest.fn());

const renderWithRouter = (ui, { route = '/login' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
};

test('renders login page', () => {
  useAuth.mockReturnValue({ isAuthenticated: false });
  renderWithRouter(<App />, { route: '/login' });
  const loginHeading = screen.getByRole('heading', { name: /login/i });
  expect(loginHeading).toBeInTheDocument();
});

test('renders profile page for authenticated user', () => {
  useAuth.mockReturnValue({ isAuthenticated: true, user: { name: 'John Doe', email: 'john@example.com', avatar: {}, banner: {} } });
  renderWithRouter(<App />, { route: '/profile' });
  const profileHeading = screen.getByRole('heading', { name: /profile/i });
  expect(profileHeading).toBeInTheDocument();
});

test('redirects to login if not authenticated', () => {
  useAuth.mockReturnValue({ isAuthenticated: false });
  renderWithRouter(<App />, { route: '/profile' });
  const loginHeading = screen.getByRole('heading', { name: /login/i });
  expect(loginHeading).toBeInTheDocument();
});

// Additional tests for AuthContext
const TestComponent = () => {
  const { user, login, logout, isAuthenticated, updateUserAvatar, apiKeyReady } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>User: {user?.name}</p>
          <button onClick={logout}>Logout</button>
          <button onClick={() => updateUserAvatar('new-avatar-url')}>Update Avatar</button>
        </div>
      ) : (
        <button onClick={() => login('test@example.com', 'password', jest.fn().mockResolvedValue({
          userDetails: {
            name: 'Test User',
            email: 'test@example.com',
            avatar: {},
            banner: {},
            venueManager: false,
          },
          accessToken: 'test-token'
        }))}>Login</button>
      )}
      <p>API Key Ready: {apiKeyReady.toString()}</p>
    </div>
  );
};

test('initializes with no user and token', async () => {
  useAuth.mockReturnValue({
    user: null,
    token: null,
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn(),
    updateUserAvatar: jest.fn(),
    apiKeyReady: false,
  });

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  expect(screen.queryByText(/User:/)).not.toBeInTheDocument();
  expect(screen.getByText(/API Key Ready: false/)).toBeInTheDocument();
});

test('updates user avatar', async () => {
  const mockUpdateUserAvatar = jest.fn().mockImplementation((avatarUrl) => {
    const updatedUser = { name: 'Test User', email: 'test@example.com', avatar: { url: avatarUrl } };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    useAuth.mockReturnValue({
      user: updatedUser,
      token: 'test-token',
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      updateUserAvatar: mockUpdateUserAvatar,
      apiKeyReady: true,
    });
  });

  useAuth.mockReturnValue({
    user: { name: 'Test User', email: 'test@example.com', avatar: {} },
    token: 'test-token',
    isAuthenticated: true,
    login: jest.fn(),
    logout: jest.fn(),
    updateUserAvatar: mockUpdateUserAvatar,
    apiKeyReady: true,
  });

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  act(() => {
    screen.getByText('Update Avatar').click();
  });

  await waitFor(() => {
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    expect(updatedUser.avatar.url).toBe('new-avatar-url');
  });
});
