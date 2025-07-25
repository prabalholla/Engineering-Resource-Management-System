import { create } from 'zustand';
import axios from 'axios';

export const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      console.log('Login attempt with:', email); // Debug log
      set({ loading: true, error: null });
      
      // Make sure we're sending the correct data format
      const loginData = { email, password };
      console.log('Sending login data:', loginData); // Debug log
      
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      console.log('Login response:', response.data); // Debug log
      
      const { user, token } = response.data;
      // Server sends 'id' but we use '_id' internally
      const normalizedUser = {
        ...user,
        _id: user.id || user._id // Use either id or _id
      };
      
      // Ensure we have a valid user object
      if (!normalizedUser._id) {
        console.error('Invalid user data received:', response.data);
        throw new Error('Invalid user data received');
      }
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user: normalizedUser, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
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

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ isAuthenticated: false });
        return;
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('http://localhost:5000/api/auth/me');
      const userData = response.data;
      
      // Normalize the user data to ensure it has _id
      const normalizedUser = {
        ...userData,
        _id: userData.id || userData._id
      };
      
      set({ user: normalizedUser, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: null, isAuthenticated: false });
    }
  },

  isManager: () => {
    const state = useAuth.getState();
    return state.user?.role === 'manager';
  },

  isEngineer: () => {
    const state = useAuth.getState();
    return state.user?.role === 'engineer';
  }
}));
