// src/components/ProtectedRoute.tsx
import React, { useRef } from 'react'; // explicit React import helps TS find JSX namespace in some CI builds
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
