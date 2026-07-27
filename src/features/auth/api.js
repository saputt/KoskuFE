import { apiPost } from '../../api/api';

export async function loginApi(email, password) {
  return apiPost('/auth/login', { email, password });
}

export async function registerApi(data) {
  return apiPost('/auth/register', data);
}
