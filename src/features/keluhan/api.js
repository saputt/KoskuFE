import { apiGet, apiPost, apiPut } from '../../api/api';

export async function getKeluhanList({ status, sort, id_user } = {}) {
  const params = {};
  if (status) params.status = status;
  if (sort) params.sort = sort;
  if (id_user) params.id_user = id_user;
  return apiGet('/keluhan', params);
}

export async function createKeluhan(data) {
  return apiPost('/keluhan', data);
}

export async function tanggapiKeluhan(id, data) {
  return apiPut(`/keluhan/${id}/tanggapan`, data);
}
