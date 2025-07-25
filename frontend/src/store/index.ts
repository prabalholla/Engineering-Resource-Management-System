import { create } from 'zustand';
import axios from 'axios';
import { useAuth } from './auth';
import { Project, User, Assignment, ErrorResponse } from '../types';

interface StoreState {
  projects: Project[];
  engineers: User[];
  assignments: Assignment[];
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchProjects: () => Promise<void>;
  fetchEngineers: () => Promise<void>;
  fetchAssignments: () => Promise<void>;
  createProject: (projectData: Omit<Project, '_id'>) => Promise<void>;
  updateProject: (id: string, projectData: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  createAssignment: (assignmentData: Omit<Assignment, '_id'>) => Promise<void>;
  updateAssignment: (id: string, assignmentData: Partial<Assignment>) => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  projects: [],
  engineers: [],
  assignments: [],
  loading: false,
  error: null,

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  fetchProjects: async () => {
    try {
      set({ loading: true });
      const response = await axios.get<Project[]>('http://localhost:5000/api/projects');
      set({ projects: response.data, loading: false });
    } catch (error) {
      const err = error as ErrorResponse;
      set({ error: err.message || 'Failed to fetch projects', loading: false });
    }
  },

  fetchEngineers: async () => {
    try {
      set({ loading: true });
      const response = await axios.get<User[]>('http://localhost:5000/api/engineers');
      set({ engineers: response.data, loading: false });
    } catch (error) {
      const err = error as ErrorResponse;
      set({ error: err.message || 'Failed to fetch engineers', loading: false });
    }
  },

  fetchAssignments: async () => {
    try {
      set({ loading: true });
      const { user } = useAuth.getState();
      const url = user?.role === 'engineer' 
        ? `http://localhost:5000/api/assignments/engineer/${user._id}`
        : 'http://localhost:5000/api/assignments';
      const response = await axios.get<Assignment[]>(url);
      set({ assignments: response.data, loading: false });
    } catch (error) {
      const err = error as ErrorResponse;
      set({ error: err.message || 'Failed to fetch assignments', loading: false });
    }
  },

  createProject: async (projectData: Omit<Project, '_id'>) => {
    try {
      set({ loading: true });
      const response = await axios.post<Project>('http://localhost:5000/api/projects', projectData);
      set((state) => ({
        projects: [...state.projects, response.data],
        loading: false
      }));
    } catch (error) {
      const err = error as ErrorResponse;
      set({ error: err.message || 'Failed to create project', loading: false });
      throw error;
    }
  },

  updateProject: async (id: string, projectData: Partial<Project>) => {
    try {
      set({ loading: true });
      const response = await axios.put<Project>(`http://localhost:5000/api/projects/${id}`, projectData);
      set((state) => ({
        projects: state.projects.map(p => p._id === id ? response.data : p),
        loading: false
      }));
    } catch (error) {
      const err = error as ErrorResponse;
      set({ error: err.message || 'Failed to update project', loading: false });
      throw error;
    }
  },

  deleteProject: async (id: string) => {
    try {
      set({ loading: true });
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      set((state) => ({
        projects: state.projects.filter(p => p._id !== id),
        loading: false
      }));
    } catch (error) {
      const err = error as ErrorResponse;
      set({ error: err.message || 'Failed to delete project', loading: false });
      throw error;
    }
  },

  createAssignment: async (assignmentData: Omit<Assignment, '_id'>) => {
    try {
      set({ loading: true });
      const response = await axios.post<Assignment>('http://localhost:5000/api/assignments', assignmentData);
      set((state) => ({
        assignments: [...state.assignments, response.data],
        loading: false
      }));
    } catch (error) {
      const err = error as ErrorResponse;
      set({ error: err.message || 'Failed to create assignment', loading: false });
      throw error;
    }
  },

  updateAssignment: async (id: string, assignmentData: Partial<Assignment>) => {
    try {
      set({ loading: true });
      const response = await axios.put<Assignment>(`http://localhost:5000/api/assignments/${id}`, assignmentData);
      set((state) => ({
        assignments: state.assignments.map(a => a._id === id ? response.data : a),
        loading: false
      }));
    } catch (error) {
      const err = error as ErrorResponse;
      set({ error: err.message || 'Failed to update assignment', loading: false });
      throw error;
    }
  },

  deleteAssignment: async (id: string) => {
    try {
      set({ loading: true });
      await axios.delete(`http://localhost:5000/api/assignments/${id}`);
      set((state) => ({
        assignments: state.assignments.filter(a => a._id !== id),
        loading: false
      }));
    } catch (error) {
      const err = error as ErrorResponse;
      set({ error: err.message || 'Failed to delete assignment', loading: false });
      throw error;
    }
  }
}));
