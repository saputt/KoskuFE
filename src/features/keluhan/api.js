import { mockDb, delay } from '../../api/mockData';

export async function getKeluhanList({ status, sort, id_user } = {}) {
  await delay();
  let data = [...mockDb.getKeluhan()];
  if (status) data = data.filter(k => k.status === status);
  if (id_user) data = data.filter(k => k.id_user === id_user);
  if (sort === 'terbaru') data.sort((a, b) => new Date(b.tanggal_keluhan) - new Date(a.tanggal_keluhan));
  else data.sort((a, b) => new Date(a.tanggal_keluhan) - new Date(b.tanggal_keluhan));
  return { status: 'success', data };
}

export async function createKeluhan(data) {
  await delay();
  const user = mockDb.getCurrentUser();
  const kamar = mockDb.getKamar().find(k => k.id_kamar === data.id_kamar);
  const keluhan = {
    id_keluhan: mockDb.nextId('keluhan'),
    id_user: user.id_user,
    id_kamar: data.id_kamar,
    nama_penghuni: user.nama,
    no_kamar: kamar?.no_kamar || '-',
    isi_keluhan: data.isi_keluhan,
    tanggal_keluhan: new Date().toISOString(),
    status: 'baru',
    tanggapan: null,
  };
  mockDb.getKeluhan().push(keluhan);
  return { status: 'success', data: keluhan };
}

export async function tanggapiKeluhan(id, data) {
  await delay();
  const keluhan = mockDb.getKeluhan().find(k => k.id_keluhan === id);
  if (!keluhan) throw new Error('Keluhan tidak ditemukan');
  keluhan.tanggapan = data.tanggapan;
  keluhan.status = data.status;
  return { status: 'success', data: keluhan };
}
