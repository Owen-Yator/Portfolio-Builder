import { Portfolio, User, ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
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

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(name: string, email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
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
