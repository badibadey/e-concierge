import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingScreen from './components/common/LoadingScreen';
import CallButton from './components/common/CallButton';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Marketplace = lazy(() => import('./pages/marketplace/Marketplace'));
const Maintenance = lazy(() => import('./pages/maintenance/Maintenance'));
const Communication = lazy(() => import('./pages/communication/Communication'));
const Amenities = lazy(() => import('./pages/amenities/Amenities'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const TelnyxTestPage = lazy(() => import('./pages/TelnyxTestPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/telnyx-test" element={<TelnyxTestPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketplace/*" element={<Marketplace />} />
            <Route path="/maintenance/*" element={<Maintenance />} />
            <Route path="/communication/*" element={<Communication />} />
            <Route path="/amenities/*" element={<Amenities />} />
          </Route>
          
          {/* Admin routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Floating call button */}
        <CallButton />
      </Suspense>
    </AuthProvider>
  );
}

export default App;