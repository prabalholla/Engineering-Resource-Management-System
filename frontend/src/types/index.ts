export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'engineer' | 'manager';
  skills: string[];
  seniority: 'junior' | 'mid' | 'senior';
  department: string;
}

export interface Assignment {
  _id: string;
  engineer: User;
  project: Project;
  startDate: string;
  endDate: string;
  allocationPercentage: number;
  status: 'active' | 'completed' | 'upcoming';
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface FormInputs {
  name: string;
  email: string;
  password?: string;
  skills: string;
  seniority: 'junior' | 'mid' | 'senior';
  department: string;
}

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
