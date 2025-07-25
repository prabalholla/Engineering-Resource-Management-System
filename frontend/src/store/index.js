import { create } from 'zustand';
import axios from 'axios';
import { useAuth } from './auth';

export const useStore = create((set) => ({
  projects: [],
  engineers: [],
  assignments: [],
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchProjects: async () => {
    try {
      set({ loading: true });
      const response = await axios.get('http://localhost:5000/api/projects');
      set({ projects: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchEngineers: async () => {
    try {
      set({ loading: true });
      const response = await axios.get('http://localhost:5000/api/engineers');
      set({ engineers: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAssignments: async () => {
    try {
      set({ loading: true });
      const { user } = useAuth.getState();
      const url = user?.role === 'engineer' 
        ? `http://localhost:5000/api/assignments/engineer/${user._id}`
        : 'http://localhost:5000/api/assignments';
      const response = await axios.get(url);
      set({ assignments: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createProject: async (projectData) => {
    try {
      set({ loading: true });
      await axios.post('http://localhost:5000/api/projects', projectData);
      const response = await axios.get('http://localhost:5000/api/projects');
      set({ projects: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createEngineer: async (engineerData) => {
    try {
      set({ loading: true });
      await axios.post('http://localhost:5000/api/engineers', engineerData);
      const response = await axios.get('http://localhost:5000/api/engineers');
      set({ engineers: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateEngineer: async (id, engineerData) => {
    try {
      set({ loading: true });
      await axios.put(`http://localhost:5000/api/engineers/${id}`, engineerData);
      const response = await axios.get('http://localhost:5000/api/engineers');
      set({ engineers: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createAssignment: async (assignmentData) => {
    try {
      set({ loading: true });
      await axios.post('http://localhost:5000/api/assignments', assignmentData);
      const response = await axios.get('http://localhost:5000/api/assignments');
      set({ assignments: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));
