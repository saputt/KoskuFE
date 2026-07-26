import { mockDb, delay } from '../../api/mockData';

export async function getPembayaranList({ status, id_user } = {}) {
  await delay();
  let data = [...mockDb.getPembayaran()];
  if (status) data = data.filter(p => p.status === status);
  if (id_user) {
    const idSewaUser = mockDb.getPenyewaan().filter(s => s.id_user === id_user).map(s => s.id_sewa);
    const idTagihanUser = mockDb.getTagihan().filter(t => idSewaUser.includes(t.id_sewa)).map(t => t.id_tagihan);
    data = data.filter(p => idTagihanUser.includes(p.id_tagihan));
  }
  return { status: 'success', data };
}

export async function bayarTagihan(data) {
  await delay();
  const tagihan = mockDb.getTagihan().find(t => t.id_tagihan === data.id_tagihan);
  if (!tagihan) throw new Error('Tagihan tidak ditemukan');

  const pembayaran = {
    id_pembayaran: mockDb.nextId('pembayaran'),
    id_tagihan: data.id_tagihan,
    nama_penghuni: tagihan.nama_penghuni,
    periode_tagihan: tagihan.periode,
    tanggal_pembayaran: new Date().toISOString().split('T')[0],
    metode_pembayaran: data.metode_pembayaran,
    jumlah_bayar: data.jumlah_bayar,
    status: 'menunggu_verifikasi',
    bukti_bayar: null,
  };
  mockDb.getPembayaran().push(pembayaran);
  return { status: 'success', data: pembayaran };
}

export async function verifikasiPembayaran(id, aksi) {
  await delay();
  const pembayaran = mockDb.getPembayaran().find(p => p.id_pembayaran === id);
  if (!pembayaran) throw new Error('Pembayaran tidak ditemukan');
  pembayaran.status = aksi === 'verifikasi' ? 'terverifikasi' : 'ditolak';

  if (aksi === 'verifikasi') {
    const tagihan = mockDb.getTagihan().find(t => t.id_tagihan === pembayaran.id_tagihan);
    if (tagihan) tagihan.status = 'lunas';
  }
  return { status: 'success', data: pembayaran };
}

export async function getLaporanPembayaran(periode) {
  await delay();
  const data = mockDb.getPembayaran();
  const totalPendapatanSemua = data.filter(p => p.status === 'terverifikasi').reduce((s, p) => s + p.jumlah_bayar, 0);
  return {
    status: 'success',
    data: {
      total_pendapatan_bulan_ini: totalPendapatanSemua,
      total_pendapatan_semua: totalPendapatanSemua,
      total_transaksi_bulan_ini: data.length,
      data,
    },
  };
}
