import { createContext, useContext } from 'react';
import { User } from '../types/User';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (credentials: { identifier: string, password: string }) => Promise<void>;
  signUp: (credentials: { username: string, email: string, password: string }) => Promise<void>;
  signOut: () => void;
  reloadUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
