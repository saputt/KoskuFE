const BASE_URL = '/api/v1';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let body = options.body;
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    if (typeof body !== 'string') body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers, body });

  if (res.status === 401 && !endpoint.startsWith('/auth/login')) {
    localStorage.removeItem('token');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  const contentType = res.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await res.json() : await res.text();

  if (!res.ok) {
    const message = (payload && typeof payload === 'object' && payload.message) || payload || res.statusText;
    throw new Error(message);
  }
  return payload;
}

export function apiGet(endpoint, params) {
  const q = {};
  if (params) {
    for (const k in params) {
      if (params[k] !== undefined && params[k] !== null && params[k] !== '') q[k] = params[k];
    }
  }
  const qs = Object.keys(q).length ? '?' + new URLSearchParams(q).toString() : '';
  return apiFetch(`${endpoint}${qs}`);
}

export function apiPost(endpoint, body) {
  return apiFetch(endpoint, { method: 'POST', body });
}

export function apiPut(endpoint, body) {
  return apiFetch(endpoint, { method: 'PUT', body });
}

export function apiDelete(endpoint) {
  return apiFetch(endpoint, { method: 'DELETE' });
}

export function apiUpload(endpoint, formData) {
  return apiFetch(endpoint, { method: 'POST', body: formData });
}
