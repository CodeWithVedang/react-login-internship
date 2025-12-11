// src/components/ProtectedRoute.tsx
import React, { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute: shows single alert (guarded) then redirects to /login if not authenticated.
 * useRef prevents double-alert under React.StrictMode (dev).
 */
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();
  const alertedRef = useRef(false);

  if (!token) {
    if (!alertedRef.current) {
      alertedRef.current = true;
      alert('Login now');
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
