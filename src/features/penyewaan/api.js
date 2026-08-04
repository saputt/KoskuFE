import { apiGet, apiPost, apiPut } from '../../api/api';

export const getPenyewaanList = (params) => apiGet('/penyewaan', params);

export const ajukanSewa = (data) => apiPost('/penyewaan', data);

export const konfirmasiSewa = (id, data) => apiPut(`/penyewaan/${id}/konfirmasi`, data);
