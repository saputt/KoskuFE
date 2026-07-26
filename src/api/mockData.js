const users = [
  { id_user: 1, nama: 'Pak Budi', email: 'budi@kosku.id', no_hp: '0812-3456-7890', role: 'pemilik', password: 'admin123' },
  { id_user: 2, nama: 'Andi Wijaya', email: 'andi@email.com', no_hp: '0812-3456-7891', role: 'penghuni', password: 'admin123' },
];

let kamarList = [
  { id_kamar: 1, no_kamar: 'A1', harga_sewa: 600000, kapasitas: 1, status: 'tersedia', fasilitas: 'AC, Kasur, Lemari' },
  { id_kamar: 2, no_kamar: 'A2', harga_sewa: 600000, kapasitas: 1, status: 'terisi', fasilitas: 'AC, Kasur, Lemari' },
  { id_kamar: 3, no_kamar: 'B1', harga_sewa: 750000, kapasitas: 2, status: 'tersedia', fasilitas: 'AC, Kasur, Lemari, Meja' },
  { id_kamar: 4, no_kamar: 'B2', harga_sewa: 750000, kapasitas: 2, status: 'terisi', fasilitas: 'AC, Kasur, Lemari, Meja' },
  { id_kamar: 5, no_kamar: 'C1', harga_sewa: 500000, kapasitas: 1, status: 'maintenance', fasilitas: 'Kasur, Lemari' },
  { id_kamar: 6, no_kamar: 'C2', harga_sewa: 500000, kapasitas: 1, status: 'tersedia', fasilitas: 'Kasur, Lemari' },
];

let penyewaanList = [
  { id_sewa: 1, id_user: 2, id_kamar: 2, nama_penghuni: 'Andi Wijaya', no_kamar: 'A2', tanggal_masuk: '2026-03-01', tanggal_selesai: '2026-08-31', durasi: 6, status: 'aktif', created_at: '2026-02-25T10:00:00Z' },
  { id_sewa: 2, id_user: 2, id_kamar: 3, nama_penghuni: 'Andi Wijaya', no_kamar: 'B1', tanggal_masuk: '2026-04-15', tanggal_selesai: null, durasi: 6, status: 'menunggu', created_at: '2026-04-10T08:00:00Z' },
  { id_sewa: 3, id_user: 3, id_kamar: 4, nama_penghuni: 'Eko Prasetyo', no_kamar: 'B2', tanggal_masuk: '2026-01-01', tanggal_selesai: '2026-06-30', durasi: 6, status: 'aktif', created_at: '2025-12-20T09:00:00Z' },
];

let tagihanList = [
  { id_tagihan: 1, id_sewa: 1, nama_penghuni: 'Andi Wijaya', no_kamar: 'A2', periode: 'April 2026', tanggal_jatuh_tempo: '2026-04-30', total_tagihan: 600000, status: 'belum_lunas' },
  { id_tagihan: 2, id_sewa: 1, nama_penghuni: 'Andi Wijaya', no_kamar: 'A2', periode: 'Maret 2026', tanggal_jatuh_tempo: '2026-03-31', total_tagihan: 600000, status: 'lunas' },
  { id_tagihan: 3, id_sewa: 3, nama_penghuni: 'Eko Prasetyo', no_kamar: 'B2', periode: 'April 2026', tanggal_jatuh_tempo: '2026-04-30', total_tagihan: 750000, status: 'lunas' },
  { id_tagihan: 4, id_sewa: 3, nama_penghuni: 'Eko Prasetyo', no_kamar: 'B2', periode: 'Maret 2026', tanggal_jatuh_tempo: '2026-03-31', total_tagihan: 750000, status: 'terlambat' },
  { id_tagihan: 5, id_sewa: 2, nama_penghuni: 'Budi Santoso', no_kamar: 'B1', periode: 'Maret 2026', tanggal_jatuh_tempo: '2026-03-31', total_tagihan: 750000, status: 'terlambat' },
];

let pembayaranList = [
  { id_pembayaran: 1, id_tagihan: 2, nama_penghuni: 'Andi Wijaya', periode_tagihan: 'Maret 2026', tanggal_pembayaran: '2026-03-05', metode_pembayaran: 'transfer', jumlah_bayar: 600000, status: 'terverifikasi', bukti_bayar: null },
  { id_pembayaran: 2, id_tagihan: 3, nama_penghuni: 'Eko Prasetyo', periode_tagihan: 'April 2026', tanggal_pembayaran: '2026-04-05', metode_pembayaran: 'transfer', jumlah_bayar: 750000, status: 'terverifikasi', bukti_bayar: null },
  { id_pembayaran: 3, id_tagihan: 1, nama_penghuni: 'Andi Wijaya', periode_tagihan: 'April 2026', tanggal_pembayaran: '2026-04-20', metode_pembayaran: 'qris', jumlah_bayar: 600000, status: 'menunggu_verifikasi', bukti_bayar: null },
];

let keluhanList = [
  { id_keluhan: 1, id_user: 2, id_kamar: 2, nama_penghuni: 'Andi Wijaya', no_kamar: 'A2', isi_keluhan: 'AC bocor dan tidak dingin sejak 3 hari lalu', tanggal_keluhan: '2026-04-10T14:00:00Z', status: 'diproses', tanggapan: 'Teknisi akan datang besok.' },
  { id_keluhan: 2, id_user: 2, id_kamar: 2, nama_penghuni: 'Andi Wijaya', no_kamar: 'A2', isi_keluhan: 'Lampu kamar mati', tanggal_keluhan: '2026-03-05T09:00:00Z', status: 'selesai', tanggapan: 'Sudah diganti lampu baru.' },
  { id_keluhan: 3, id_user: 3, id_kamar: 4, nama_penghuni: 'Eko Prasetyo', no_kamar: 'B2', isi_keluhan: 'Pintu kamar sulit ditutup', tanggal_keluhan: '2026-03-28T11:00:00Z', status: 'diproses', tanggapan: 'Sedang dijadwalkan perbaikan.' },
];

let currentUser = null;
let nextId = { kamar: 7, sewa: 4, tagihan: 6, pembayaran: 4, keluhan: 4 };

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

function paginate(arr, page = 1, limit = 20) {
  const start = (page - 1) * limit;
  return { data: arr.slice(start, start + limit), pagination: { page, limit, total: arr.length } };
}

export const mockDb = {
  getUsers: () => users,
  getKamar: () => kamarList,
  getPenyewaan: () => penyewaanList,
  getTagihan: () => tagihanList,
  getPembayaran: () => pembayaranList,
  getKeluhan: () => keluhanList,
  getCurrentUser: () => currentUser,
  setCurrentUser: (u) => { currentUser = u },
  nextId: (entity) => nextId[entity]++,
};

export { delay, paginate };
