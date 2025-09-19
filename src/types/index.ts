// Enhanced Types with better specificity
export interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  technologies: string;
  url: string;
  github: string;
}

export interface PortfolioData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  experience: ExperienceItem[];
  education: any[]; // Can be enhanced later
  projects: ProjectItem[];
  github: string;
  linkedin: string;
  website: string;
  twitter: string;
  languages: string[];
  certifications: string[];
  interests: string[];
  theme: string;
  template: string;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  createdAt: Date;
}

// Portfolio types
export interface Portfolio {
  id: string;
  userId: string;
  title: string;
  template: string;
  data: PortfolioData;
  isPublic: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
