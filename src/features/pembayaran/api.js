import { apiGet, apiPut, apiUpload } from '../../api/api';

export const getPembayaranList = (params) => apiGet('/pembayaran', params);

export const bayarTagihan = (formData) => apiUpload('/pembayaran', formData);

export const verifikasiPembayaran = (id, data) => apiPut(`/pembayaran/${id}/verifikasi`, data);

export const getLaporanPembayaran = (periode) => apiGet('/pembayaran/laporan', periode ? { periode } : undefined);
