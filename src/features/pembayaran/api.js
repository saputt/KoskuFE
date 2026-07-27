import { apiGet, apiPut, apiUpload } from '../../api/api';

export async function getPembayaranList({ status, id_user } = {}) {
  const params = {};
  if (status) params.status = status;
  if (id_user) params.id_user = id_user;
  return apiGet('/pembayaran', params);
}

export async function bayarTagihan(data) {
  const formData = new FormData();
  formData.append('id_tagihan', data.id_tagihan);
  formData.append('metode_pembayaran', data.metode_pembayaran);
  formData.append('jumlah_bayar', data.jumlah_bayar.toString());
  if (data.bukti_bayar) {
    formData.append('bukti_bayar', data.bukti_bayar);
  }
  return apiUpload('/pembayaran', formData);
}

export async function verifikasiPembayaran(id, aksi, alasan = null) {
  return apiPut(`/pembayaran/${id}/verifikasi`, { aksi, alasan });
}

export async function getLaporanPembayaran(periode) {
  const params = {};
  if (periode) params.periode = periode;
  return apiGet('/pembayaran/laporan', params);
}

export async function exportPembayaran(periode, format = 'csv') {
  const params = { format };
  if (periode) params.periode = periode;
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/v1/pembayaran/export?${new URLSearchParams(params)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Gagal export');
  return res.blob();
}
