import { apiGet, apiPost, apiPut } from '../../api/api';

export async function getTagihanList({ status, sort, id_user } = {}) {
  const params = {};
  if (status) params.status = status;
  if (sort) params.sort = sort;
  if (id_user) params.id_user = id_user;
  return apiGet('/tagihan', params);
}

export async function generateTagihan(periode, tanggalJatuhTempo) {
  return apiPost('/tagihan/generate', { periode, tanggal_jatuh_tempo: tanggalJatuhTempo });
}

export async function updateTagihan(id, data) {
  return apiPut(`/tagihan/${id}`, data);
}
