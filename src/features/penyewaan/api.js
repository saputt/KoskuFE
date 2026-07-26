import { mockDb, delay } from '../../api/mockData';

export async function getPenyewaanList({ status, sort, id_user } = {}) {
  await delay();
  let data = [...mockDb.getPenyewaan()];
  if (status) data = data.filter(s => s.status === status);
  if (id_user) data = data.filter(s => s.id_user === id_user);
  if (sort === 'terbaru') data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  else data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  return { status: 'success', data };
}

export async function ajukanSewa(data) {
  await delay();
  const kamar = mockDb.getKamar().find(k => k.id_kamar === data.id_kamar);
  if (!kamar || kamar.status !== 'tersedia') throw new Error('Kamar tidak tersedia');

  const user = mockDb.getCurrentUser();
  const tglMulai = new Date(data.tanggal_masuk);
  const tglSelesai = new Date(tglMulai);
  tglSelesai.setMonth(tglSelesai.getMonth() + data.durasi);

  const sewa = {
    id_sewa: mockDb.nextId('sewa'),
    id_user: user.id_user,
    id_kamar: data.id_kamar,
    nama_penghuni: user.nama,
    no_kamar: kamar.no_kamar,
    tanggal_masuk: data.tanggal_masuk,
    tanggal_selesai: tglSelesai.toISOString().split('T')[0],
    durasi: data.durasi,
    status: 'menunggu',
    created_at: new Date().toISOString(),
  };
  mockDb.getPenyewaan().push(sewa);
  kamar.status = 'terisi';
  return { status: 'success', data: sewa };
}

export async function konfirmasiSewa(id, aksi) {
  await delay();
  const sewa = mockDb.getPenyewaan().find(s => s.id_sewa === id);
  if (!sewa) throw new Error('Penyewaan tidak ditemukan');
  sewa.status = aksi === 'setujui' ? 'aktif' : 'ditolak';
  return { status: 'success', data: sewa };
}
