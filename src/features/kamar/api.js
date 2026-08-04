import { apiGet, apiPost, apiPut, apiDelete } from '../../api/api';

export const getKamarList = (params) => apiGet('/kamar', params);

export const getKamarDetail = (id) => apiGet(`/kamar/${id}`);

export const createKamar = (data) => apiPost('/kamar', data);

export const updateKamar = (id, data) => apiPut(`/kamar/${id}`, data);

export const deleteKamar = (id) => apiDelete(`/kamar/${id}`);
