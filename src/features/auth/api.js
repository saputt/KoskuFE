import { apiGet, apiPost } from '../../api/api';

export const loginApi = (email, password) => apiPost('/auth/login', { email, password });

export const registerApi = (data) => apiPost('/auth/register', data);

export const logoutApi = () => apiPost('/auth/logout');

export const getMeApi = () => apiGet('/auth/me');
