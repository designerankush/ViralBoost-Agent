import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  connectedAccounts: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  connectAccount: (platform: string) => void;
  disconnectAccount: (platform: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('viralboost_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('viralboost_user');
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('viralboost_users') || '[]');
    const found = users.find((u: any) => u.email === email.toLowerCase());

    if (!found) {
      return { success: false, error: 'No account found with this email. Please sign up.' };
    }

    if (found.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem('viralboost_user', JSON.stringify(userData));
    return { success: true };
  };

  const signup = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('viralboost_users') || '[]');

    if (users.some((u: any) => u.email === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists. Please log in.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const newUser: User & { password: string } = {
      id: `user_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
      connectedAccounts: [],
    };

    users.push(newUser);
    localStorage.setItem('viralboost_users', JSON.stringify(users));

    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('viralboost_user', JSON.stringify(userData));

    // Initialize user data
    localStorage.setItem(`posts_${userData.id}`, JSON.stringify([]));
    localStorage.setItem(`analytics_${userData.id}`, JSON.stringify(generateInitialAnalytics()));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('viralboost_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('viralboost_user', JSON.stringify(updated));

    const users = JSON.parse(localStorage.getItem('viralboost_users') || '[]');
    const idx = users.findIndex((u: any) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('viralboost_users', JSON.stringify(users));
    }
  };

  const connectAccount = (platform: string) => {
    if (!user) return;
    const updated = {
      ...user,
      connectedAccounts: [...new Set([...user.connectedAccounts, platform])],
    };
    setUser(updated);
    localStorage.setItem('viralboost_user', JSON.stringify(updated));
  };

  const disconnectAccount = (platform: string) => {
    if (!user) return;
    const updated = {
      ...user,
      connectedAccounts: user.connectedAccounts.filter(p => p !== platform),
    };
    setUser(updated);
    localStorage.setItem('viralboost_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, connectAccount, disconnectAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

function generateInitialAnalytics() {
  return {
    totalReach: 0,
    totalEngagement: 0,
    totalFollowers: 0,
    posts: [],
  };
}
