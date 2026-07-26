const BASE_URL = '/api/v1';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export function apiGet(endpoint, params) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch(`${endpoint}${qs}`);
}

export function apiPost(endpoint, body) {
  return apiFetch(endpoint, { method: 'POST', body: JSON.stringify(body) });
}

export function apiPut(endpoint, body) {
  return apiFetch(endpoint, { method: 'PUT', body: JSON.stringify(body) });
}

export function apiDelete(endpoint) {
  return apiFetch(endpoint, { method: 'DELETE' });
}

export function apiUpload(endpoint, formData) {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetch(`${BASE_URL}${endpoint}`, { method: 'POST', headers, body: formData }).then(r => r.json());
}
