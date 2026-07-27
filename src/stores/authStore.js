import { create } from 'zustand';
import { apiPost, apiGet } from '../api/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (email, password) => {
    try {
      const json = await apiPost('/auth/login', { email, password });
      const { user, token } = json.data;
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true });
      return true;
    } catch (err) {
      return false;
    }
  },

  register: async (data) => {
    try {
      const json = await apiPost('/auth/register', data);
      const { user, token } = json.data;
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true });
      return json;
    } catch (err) {
      throw err;
    }
  },

  logout: async () => {
    try {
      await apiPost('/auth/logout');
    } catch {
      // tetap logout meski gagal
    }
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      const json = await apiGet('/auth/me');
      set({ user: json.data, isAuthenticated: true });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  setUser: (user) => set({ user }),
}));

export default useAuthStore;
