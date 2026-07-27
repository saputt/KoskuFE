const BASE_URL = '/api/v1';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const json = await res.json().catch(() => ({ message: res.statusText }));

  if (!res.ok) {
    throw new ApiError(json.message || 'Request failed', res.status);
  }

  return json;
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
  return apiFetch(endpoint, { method: 'POST', body: formData });
}
