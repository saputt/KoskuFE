import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  setSession: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },

  setUser: (user) => set({ user }),

  clearSession: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
