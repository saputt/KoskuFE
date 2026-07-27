import { apiGet, apiPost, apiPut, apiDelete } from '../../api/api';

export async function getKamarList({ status, search, sort, page = 1, limit = 20 } = {}) {
  const params = { page, limit };
  if (status) params.status = status;
  if (search) params.search = search;
  if (sort) params.sort = sort;
  return apiGet('/kamar', params);
}

export async function getKamarDetail(id) {
  return apiGet(`/kamar/${id}`);
}

export async function createKamar(data) {
  return apiPost('/kamar', data);
}

export async function updateKamar(id, data) {
  return apiPut(`/kamar/${id}`, data);
}

export async function deleteKamar(id) {
  return apiDelete(`/kamar/${id}`);
}
