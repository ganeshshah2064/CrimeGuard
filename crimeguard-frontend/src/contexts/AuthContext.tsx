import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// User interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  createdAt: Date;
  lastLogin: Date;
}

// Registration data interface
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication service for development
const mockAuthService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (email && password) {
      const user: User = {
        id: '1',
        email: email,
        firstName: email.split('@')[0].split('.')[0] || 'User',
        lastName: email.split('@')[0].split('.')[1] || 'Name',
        fullName: email.split('@')[0].replace('.', ' ') || 'User Name',
        createdAt: new Date('2024-01-01'),
        lastLogin: new Date(),
      };
      return user;
    }
    
    throw new Error('Invalid credentials');
  },
  
  register: async (userData: RegisterData): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      createdAt: new Date(),
      lastLogin: new Date(),
    };
    
    return user;
  },
  
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('crimeguard_user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        return {
          ...userData,
          createdAt: new Date(userData.createdAt),
          lastLogin: new Date(userData.lastLogin),
        };
      } catch {
        return null;
      }
    }
    return null;
  },
  
  saveUser: (user: User) => {
    localStorage.setItem('crimeguard_user', JSON.stringify(user));
    localStorage.setItem('crimeguard_token', 'mock_jwt_token_' + user.id);
  },
  
  clearUser: () => {
    localStorage.removeItem('crimeguard_user');
    localStorage.removeItem('crimeguard_token');
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = mockAuthService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await mockAuthService.login(email, password);
      mockAuthService.saveUser(user);
      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    mockAuthService.clearUser();
    setUser(null);
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const user = await mockAuthService.register(userData);
      mockAuthService.saveUser(user);
      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
