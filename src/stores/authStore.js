import { create } from 'zustand';
import { mockDb } from '../api/mockData';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: (email, password) => {
    const found = mockDb.getUsers().find(u => u.email === email && u.password === password);
    if (!found) return false;
    const token = `mock-token-${found.id_user}`;
    const { password: _, ...user } = found;
    localStorage.setItem('token', token);
    mockDb.setCurrentUser(user);
    set({ user, token, isAuthenticated: true });
    return true;
  },

  register: (data) => {
    const users = mockDb.getUsers();
    if (users.find(u => u.email === data.email)) return false;
    const newUser = { id_user: users.length + 1, ...data, password: data.password };
    users.push(newUser);
    return true;
  },

  logout: () => {
    localStorage.removeItem('token');
    mockDb.setCurrentUser(null);
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: () => {
    const user = mockDb.getCurrentUser();
    if (user) set({ user, isAuthenticated: true });
  },

  setUser: (user) => set({ user }),
}));

export default useAuthStore;
