import axios from 'axios';
import { User } from '../store/authStore';

const API_BASE_URL = 'http://localhost:3000/api';

class AuthService {
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      // Mock authentication for demo purposes
      const mockUsers = [
        {
          id: '1',
          name: 'John Student',
          email: 'student@luminax.com',
          role: 'student' as const,
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          id: '2',
          name: 'Jane Instructor',
          email: 'instructor@luminax.com',
          role: 'instructor' as const,
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          id: '3',
          name: 'Admin User',
          email: 'admin@luminax.com',
          role: 'admin' as const,
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        }
      ];

      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'password123') {
        localStorage.setItem('token', 'mock-token-' + user.id);
        return user;
      }
      
      throw new Error('Invalid credentials');
    }
  }

  async register(name: string, email: string, password: string): Promise<User> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      // Mock registration for demo purposes
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'student',
        avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
      };
      
      localStorage.setItem('token', 'mock-token-' + newUser.id);
      return newUser;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      // Mock current user check
      if (token.startsWith('mock-token-')) {
        const userId = token.replace('mock-token-', '');
        const mockUsers = [
          {
            id: '1',
            name: 'John Student',
            email: 'student@luminax.com',
            role: 'student' as const,
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          {
            id: '2',
            name: 'Jane Instructor',
            email: 'instructor@luminax.com',
            role: 'instructor' as const,
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          {
            id: '3',
            name: 'Admin User',
            email: 'admin@luminax.com',
            role: 'admin' as const,
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          }
        ];
        
        return mockUsers.find(u => u.id === userId) || null;
      }
      return null;
    }
  }
}

export const authService = new AuthService();