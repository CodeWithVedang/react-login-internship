import React, { createContext, useContext, useState } from 'react';

/**
 * AuthContext (localStorage-based)
 *
 * - Reads token & user synchronously on initialization so that the token
 *   is available on the very first render (prevents flicker).
 * - login(): if saved credentials don't exist, saves them (first-run).
 *            otherwise validates input against saved credentials.
 * - token/user persisted in localStorage (survives browser restarts).
 */

interface User {
  username: string;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronously read token/user from localStorage for correct initial render
  const initialToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const initialUserRaw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const initialUser: User | null = initialUserRaw ? JSON.parse(initialUserRaw) : null;

  const [user, setUser] = useState<User | null>(initialUser);
  const [token, setToken] = useState<string | null>(initialToken);
  const [loading, setLoading] = useState<boolean>(false);

  // login: handle first-run saving & subsequent credential checking
  const login = async (username: string, password: string) => {
    setLoading(true);

    return new Promise<void>((resolve, reject) => {
      // simulate network delay
      setTimeout(() => {
        try {
          const savedUsername = localStorage.getItem('saved_username');
          const savedPassword = localStorage.getItem('saved_password');

          // First-time: store credentials
          if (!savedUsername || !savedPassword) {
            localStorage.setItem('saved_username', username);
            localStorage.setItem('saved_password', password);

            const fakeUser = { username, name: username };
            const fakeToken = 'local-token';

            localStorage.setItem('token', fakeToken);
            localStorage.setItem('user', JSON.stringify(fakeUser));

            setUser(fakeUser);
            setToken(fakeToken);

            setLoading(false);
            resolve();
            return;
          }

          // Validate against saved credentials
          if (savedUsername === username && savedPassword === password) {
            const fakeUser = { username, name: username };
            const fakeToken = 'local-token';

            localStorage.setItem('token', fakeToken);
            localStorage.setItem('user', JSON.stringify(fakeUser));

            setUser(fakeUser);
            setToken(fakeToken);

            setLoading(false);
            resolve();
          } else {
            setLoading(false);
            reject(new Error('Invalid username or password'));
          }
        } catch (err) {
          setLoading(false);
          reject(err);
        }
      }, 600);
    });
  };

  // logout: clear token & user but keep saved credentials (so they can login again)
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
