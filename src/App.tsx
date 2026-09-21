import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import Analytics from './pages/Analytics';
import Accounts from './pages/Accounts';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/app/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
      <Route path="/app/posts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
      <Route path="/app/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/app/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
      <Route path="/app/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
