import { Portfolio, User, ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Request timeout in milliseconds
const REQUEST_TIMEOUT = 10000;

// Cache for GET requests
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    // Check cache for GET requests
    if (!options.method || options.method === 'GET') {
      const cached = cache.get(url);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }
    }

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle specific HTTP status codes
        if (response.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          throw new Error('Authentication expired. Please login again.');
        }
        if (response.status === 403) {
          throw new Error('You do not have permission to perform this action.');
        }
        if (response.status === 404) {
          throw new Error('The requested resource was not found.');
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      // Cache successful GET requests
      if (!options.method || options.method === 'GET') {
        cache.set(url, { data, timestamp: Date.now() });
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout. Please check your connection and try again.');
        }
        if (error.name === 'TypeError') {
          throw new Error('Network error. Please check your internet connection.');
        }
      }
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Clear cache method
  clearCache(): void {
    cache.clear();
  }

  // Clear specific cache entry
  clearCacheEntry(endpoint: string): void {
    const url = `${API_BASE_URL}${endpoint}`;
    cache.delete(url);
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(name: string, email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ 
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ')[1] || '',
        username: email.split('@')[0],
        email, 
        password 
      }),
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/auth/me');
  }

  // Portfolio endpoints
  async getPortfolios(page = 1, limit = 10): Promise<PaginatedResponse<Portfolio>> {
    const response = await this.request<PaginatedResponse<Portfolio>>(`/portfolios?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getPortfolio(id: string): Promise<ApiResponse<Portfolio>> {
    return this.request(`/portfolios/${id}`);
  }

  async getPortfolioBySlug(slug: string): Promise<ApiResponse<Portfolio>> {
    return this.request(`/portfolios/slug/${slug}`);
  }

  async createPortfolio(portfolio: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Portfolio>> {
    return this.request('/portfolios', {
      method: 'POST',
      body: JSON.stringify(portfolio),
    });
  }

  async updatePortfolio(id: string, portfolio: Partial<Portfolio>): Promise<ApiResponse<Portfolio>> {
    return this.request(`/portfolios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(portfolio),
    });
  }

  async deletePortfolio(id: string): Promise<ApiResponse<null>> {
    return this.request(`/portfolios/${id}`, {
      method: 'DELETE',
    });
  }

  async publishPortfolio(id: string): Promise<ApiResponse<Portfolio>> {
    return this.request(`/portfolios/${id}/publish`, {
      method: 'POST',
    });
  }

  async unpublishPortfolio(id: string): Promise<ApiResponse<Portfolio>> {
    return this.request(`/portfolios/${id}/unpublish`, {
      method: 'POST',
    });
  }

  // Public portfolio endpoints (no auth required)
  async getPublicPortfolio(slug: string): Promise<ApiResponse<Portfolio>> {
    const url = `${API_BASE_URL}/public/portfolios/${slug}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async downloadPortfolioHTML(slug: string): Promise<Blob> {
    const url = `${API_BASE_URL}/public/portfolios/${slug}/download`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to download portfolio');
      }

      return response.blob();
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  // User endpoints
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async uploadProfilePicture(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('profilePicture', file);

    return this.request('/users/profile-picture', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Template endpoints
  async getTemplates(): Promise<ApiResponse<any[]>> {
    return this.request('/templates');
  }

  async getTemplate(id: string): Promise<ApiResponse<any>> {
    return this.request(`/templates/${id}`);
  }
}

export const apiService = new ApiService();
export default apiService;
