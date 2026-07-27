import { apiGet } from '../../api/api';

export async function getDashboardPemilik() {
  return apiGet('/dashboard/pemilik');
}

export async function getDashboardPenghuni() {
  return apiGet('/dashboard/penghuni');
}

export async function getAktivitas(limit) {
  const params = {};
  if (limit) params.limit = limit;
  return apiGet('/dashboard/aktivitas', params);
}
