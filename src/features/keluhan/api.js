import { apiGet, apiPost, apiPut } from '../../api/api';

export const getKeluhanList = (params) => apiGet('/keluhan', params);

export const createKeluhan = (data) => apiPost('/keluhan', data);

export const tanggapiKeluhan = (id, data) => apiPut(`/keluhan/${id}/tanggapan`, data);
