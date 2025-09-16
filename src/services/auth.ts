import { User, LoginCredentials, SignUpData, AuthState } from '../types';
import { apiService } from './api';

class AuthService {
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
  };

  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const response = await apiService.getCurrentUser();
        this.setAuthState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        // Token is invalid or expired
        localStorage.removeItem('authToken');
        this.setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      this.setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }

  private setAuthState(newState: Partial<AuthState>) {
    this.authState = { ...this.authState, ...newState };
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getAuthState(): AuthState {
    return this.authState;
  }

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      this.setAuthState({ isLoading: true });
      
      const response = await apiService.login(credentials.email, credentials.password);
      const { user, token } = response.data;

      localStorage.setItem('authToken', token);
      
      this.setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      this.setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      throw error;
    }
  }

  async signup(signUpData: SignUpData): Promise<void> {
    try {
      this.setAuthState({ isLoading: true });
      
      const response = await apiService.signup(
        signUpData.name,
        signUpData.email,
        signUpData.password
      );
      const { user, token } = response.data;

      localStorage.setItem('authToken', token);
      
      this.setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      this.setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.logout();
    } catch (error) {
      // Log error but continue with logout
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('authToken');
      this.setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await apiService.updateProfile(data);
      const updatedUser = response.data;
      
      this.setAuthState({
        user: updatedUser
      });
      
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.authState.user;
  }

  isLoading(): boolean {
    return this.authState.isLoading;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Helper method for checking if user has specific permissions
  hasPermission(permission: string): boolean {
    // Implement permission checking logic based on your requirements
    return this.authState.isAuthenticated;
  }

  // Helper method for checking if user can access a resource
  canAccessResource(resourceUserId: string): boolean {
    return this.authState.user?.id === resourceUserId;
  }
}

export const authService = new AuthService();
export default authService;
