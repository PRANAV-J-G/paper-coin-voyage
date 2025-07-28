import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/services/api';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  bio?: string;
  created_at?: string;
  total_trades?: number;
  active_trades?: number;
  total_pnl?: number;
  balance?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await apiService.auth.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to get user profile:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.auth.login(email, password);
      setToken(response.token);
      // Get user data from the token
      const userData = await apiService.auth.getCurrentUser();
      setUser(userData);
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await apiService.auth.register(data);
      setToken(response.token);
      // Get user data from the token
      const userData = await apiService.auth.getCurrentUser();
      setUser(userData);
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      await apiService.auth.updateProfile({
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        bio: data.bio
      });
      // Refresh user data after update
      const userData = await apiService.auth.getCurrentUser();
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};