// src/components/ProtectedRoute.tsx

/// <reference types="react" />
import * as React from 'react'; // import React as namespace (works reliably in CI)
import { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute:
 * - The triple-slash reference above ensures TypeScript loads the 'react' type declarations.
 * - Using `import * as React` is a robust import style for some TS build setups.
 * - We keep the useRef guard so the alert only shows once (even in StrictMode).
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
