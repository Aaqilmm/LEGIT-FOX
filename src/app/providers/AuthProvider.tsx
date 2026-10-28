import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';
import { DEMO_USERS } from '@/data/demoUsers';
import { isDemoMode } from '@/config/runtimeConfig';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchDemoUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load persisted demo user if in demo mode
    if (isDemoMode) {
      const storedUserId = localStorage.getItem('legit-demo-user');
      if (storedUserId) {
        const demoUser = DEMO_USERS.find((u) => u.id === storedUserId);
        if (demoUser) {
          setUser(demoUser);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    if (isDemoMode) {
      const demoUser = DEMO_USERS.find((u) => u.email === email);
      if (demoUser) {
        setUser(demoUser);
        localStorage.setItem('legit-demo-user', demoUser.id);
      } else {
        throw new Error('Demo user not found');
      }
    } else {
      throw new Error('API authentication not yet configured');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('legit-demo-user');
  };

  const switchDemoUser = (userId: string) => {
    if (!isDemoMode) return;
    const demoUser = DEMO_USERS.find((u) => u.id === userId);
    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem('legit-demo-user', demoUser.id);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    switchDemoUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
