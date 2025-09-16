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
  template: TemplateType;
  sections: PortfolioSection[];
  isPublic: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioSection {
  id: string;
  type: SectionType;
  title: string;
  content: any;
  order: number;
  isVisible: boolean;
}

export type SectionType = 
  | 'hero'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'contact';

export type TemplateType = 
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'creative'
  | 'professional';

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
