import { apiGet, apiPost, apiPut } from '../../api/api';

export const getTagihanList = (params) => apiGet('/tagihan', params);

export const getTagihanDetail = (id) => apiGet(`/tagihan/${id}`);

export const generateTagihan = (data) => apiPost('/tagihan/generate', data);

export const updateTagihan = (id, data) => apiPut(`/tagihan/${id}`, data);
