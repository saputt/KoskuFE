import { mockDb, delay } from '../../api/mockData';

export async function getTagihanList({ status, sort, id_user } = {}) {
  await delay();
  let data = [...mockDb.getTagihan()];
  if (status) data = data.filter(t => t.status === status);
  if (id_user) {
    const idSewaUser = mockDb.getPenyewaan().filter(s => s.id_user === id_user).map(s => s.id_sewa);
    data = data.filter(t => idSewaUser.includes(t.id_sewa));
  }
  if (sort === 'terbaru') data.sort((a, b) => new Date(b.tanggal_jatuh_tempo) - new Date(a.tanggal_jatuh_tempo));
  else data.sort((a, b) => new Date(a.tanggal_jatuh_tempo) - new Date(b.tanggal_jatuh_tempo));
  return { status: 'success', data };
}

export async function generateTagihan(periode, tanggalJatuhTempo) {
  await delay();
  const penyewaanAktif = mockDb.getPenyewaan().filter(s => s.status === 'aktif');
  const baru = [];
  for (const s of penyewaanAktif) {
    const kamar = mockDb.getKamar().find(k => k.id_kamar === s.id_kamar);
    const tagihan = {
      id_tagihan: mockDb.nextId('tagihan'),
      id_sewa: s.id_sewa,
      nama_penghuni: s.nama_penghuni,
      no_kamar: s.no_kamar,
      periode,
      tanggal_jatuh_tempo: tanggalJatuhTempo,
      total_tagihan: kamar.harga_sewa,
      status: 'belum_lunas',
    };
    mockDb.getTagihan().push(tagihan);
    baru.push(tagihan);
  }
  return { status: 'success', data: { total: baru.length, total_nominal: baru.reduce((s, t) => s + t.total_tagihan, 0), tagihan: baru } };
}

export async function updateTagihan(id, data) {
  await delay();
  const tagihan = mockDb.getTagihan().find(t => t.id_tagihan === id);
  if (!tagihan) throw new Error('Tagihan tidak ditemukan');
  Object.assign(tagihan, data);
  return { status: 'success', data: tagihan };
}
