// src/services/auth.ts
// Simple mock authentication for demo purposes

// Simulate server delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Mocked "users"
const MOCK_USER = {
  username: 'test',
  password: 'test123',
  name: 'Vedang Shelatkar',
};

// login: validates credentials and returns a fake token + user
export async function loginApi(username: string, password: string) {
  await delay(700); // simulate network

  // Basic check — replace with real API call in production
  if (username === MOCK_USER.username && password === MOCK_USER.password) {
    // return a fake JWT token and user data
    return {
      token: 'fake-jwt-token-12345',
      user: { name: MOCK_USER.name, username: MOCK_USER.username },
    };
  }

  // Simulate auth error
  throw new Error('Invalid username or password');
}
