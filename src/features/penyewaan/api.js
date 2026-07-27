import { apiGet, apiPost, apiPut } from '../../api/api';

export async function getPenyewaanList({ status, sort, id_user } = {}) {
  const params = {};
  if (status) params.status = status;
  if (sort) params.sort = sort;
  if (id_user) params.id_user = id_user;
  return apiGet('/penyewaan', params);
}

export async function ajukanSewa(data) {
  return apiPost('/penyewaan', data);
}

export async function konfirmasiSewa(id, aksi, alasan = null) {
  return apiPut(`/penyewaan/${id}/konfirmasi`, { aksi, alasan });
}
