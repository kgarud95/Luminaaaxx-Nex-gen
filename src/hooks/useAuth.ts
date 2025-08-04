import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          useAuthStore.setState({ user: currentUser, isAuthenticated: true });
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      }
    };

    initAuth();
  }, []);

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
};