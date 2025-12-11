// src/pages/Login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  FormControl,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

type FormData = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { login, token, loading } = useAuth();

  // If already logged in, redirect to dashboard immediately
  if (token) return <Navigate to="/dashboard" replace />;

  // text color that adapts to light/dark
  const labelColor = useColorModeValue('gray.700', 'gray.200');
  const headingColor = useColorModeValue('gray.800', 'whiteAlpha.900');

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.username, data.password);
    } catch (err: any) {
      alert(err?.message || 'Login failed');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={12} p={6} borderRadius="md" bg={useColorModeValue('white', 'gray.700')} boxShadow="md">
      <Heading size="md" mb={4} color={headingColor}>Login</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={3}>
          <FormLabel color={labelColor}>Username</FormLabel>
          <Input
            placeholder="username"
            {...register('username', { required: 'Username is required' })}
            bg={useColorModeValue('gray.50', 'gray.600')}
          />
          {errors.username && <Text color="red.400" fontSize="sm">{errors.username.message}</Text>}
        </FormControl>

        <FormControl mb={3}>
          <FormLabel color={labelColor}>Password</FormLabel>
          <Input
            type="password"
            placeholder="password"
            {...register('password', { required: 'Password is required' })}
            bg={useColorModeValue('gray.50', 'gray.600')}
          />
          {errors.password && <Text color="red.400" fontSize="sm">{errors.password.message}</Text>}
        </FormControl>

        <Button type="submit" colorScheme="blue" isLoading={loading as any}>{loading ? 'Logging...' : 'Login'}</Button>
      </form>
    </Box>
  );
};

export default Login;
