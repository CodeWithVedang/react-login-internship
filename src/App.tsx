// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// <-- Import these from Chakra, not react-router-dom
import { Box, Flex, Spacer } from '@chakra-ui/react';

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeToggle from './components/ThemeToggle';

const HomeRedirect: React.FC = () => {
  const { token } = useAuth();
  if (token) return <Navigate to="/dashboard" replace />;
  return <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Box className="container" p={4}>
        <Flex mb={4} align="center">
          <Box as="h1" fontSize="lg" fontWeight="bold">Auth Dashboard</Box>
          <Spacer />
          <ThemeToggle />
        </Flex>

        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </AuthProvider>
  );
};

export default App;
