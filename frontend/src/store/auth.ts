import { create } from 'zustand';
import axios from 'axios';
import { User, ErrorResponse } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

interface LoginResponse {
  user: User & { id?: string };
  token: string;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email: string, password: string): Promise<boolean> => {
    try {
      set({ loading: true, error: null });
      
      const loginData = { email, password };
      const response = await axios.post<LoginResponse>('http://localhost:5000/api/auth/login', loginData);
      
      const { user, token } = response.data;
      const normalizedUser: User = {
        ...user,
        _id: user.id || user._id
      };
      
      if (!normalizedUser._id) {
        console.error('Invalid user data received:', response.data);
        throw new Error('Invalid user data received');
      }
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user: normalizedUser, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      const err = error as ErrorResponse;
      set({ 
        error: err.response?.data?.message || 'Login failed', 
        loading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  }
}));
