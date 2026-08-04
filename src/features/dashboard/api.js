import { apiGet } from '../../api/api';

export const getDashboardPemilik = () => apiGet('/dashboard/pemilik');

export const getDashboardPenghuni = () => apiGet('/dashboard/penghuni');

export const getAktivitas = (limit) => apiGet('/dashboard/aktivitas', limit ? { limit } : undefined);
