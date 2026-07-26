import { mockDb, delay, paginate } from '../../api/mockData';

export async function getKamarList({ status, search, sort, page = 1, limit = 20 } = {}) {
  await delay();
  let data = [...mockDb.getKamar()];
  if (status) data = data.filter(k => k.status === status);
  if (search) data = data.filter(k => k.no_kamar.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'harga_asc') data.sort((a, b) => a.harga_sewa - b.harga_sewa);
  if (sort === 'harga_desc') data.sort((a, b) => b.harga_sewa - a.harga_sewa);
  return { status: 'success', ...paginate(data, page, limit) };
}

export async function getKamarDetail(id) {
  await delay();
  const kamar = mockDb.getKamar().find(k => k.id_kamar === id);
  if (!kamar) throw new Error('Kamar tidak ditemukan');
  return { status: 'success', data: kamar };
}

export async function createKamar(data) {
  await delay();
  const kamar = mockDb.getKamar();
  const baru = { id_kamar: mockDb.nextId('kamar'), ...data };
  kamar.push(baru);
  return { status: 'success', data: baru };
}

export async function updateKamar(id, data) {
  await delay();
  const kamar = mockDb.getKamar().find(k => k.id_kamar === id);
  if (!kamar) throw new Error('Kamar tidak ditemukan');
  Object.assign(kamar, data);
  return { status: 'success', data: kamar };
}

export async function deleteKamar(id) {
  await delay();
  const idx = mockDb.getKamar().findIndex(k => k.id_kamar === id);
  if (idx === -1) throw new Error('Kamar tidak ditemukan');
  mockDb.getKamar().splice(idx, 1);
  return { status: 'success' };
}
