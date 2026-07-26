import { mockDb, delay } from '../../api/mockData';

export async function getDashboardPemilik() {
  await delay();
  const kamar = mockDb.getKamar();
  const penyewaan = mockDb.getPenyewaan();
  const tagihan = mockDb.getTagihan();
  const pembayaran = mockDb.getPembayaran();
  return {
    status: 'success',
    data: {
      total_kamar: kamar.length,
      kamar_terisi: kamar.filter(k => k.status === 'terisi').length,
      kamar_kosong: kamar.filter(k => k.status === 'tersedia').length,
      penyewaan_baru: penyewaan.filter(s => s.status === 'menunggu').length,
      tagihan_belum_lunas: tagihan.filter(t => t.status === 'belum_lunas' || t.status === 'terlambat').length,
      total_tagihan_belum_lunas: tagihan.filter(t => t.status !== 'lunas').reduce((s, t) => s + t.total_tagihan, 0),
      pembayaran_menunggu: pembayaran.filter(p => p.status === 'menunggu_verifikasi').length,
    },
  };
}

export async function getDashboardPenghuni(idUser) {
  await delay();
  const penyewaan = mockDb.getPenyewaan().filter(s => s.id_user === idUser);
  const aktif = penyewaan.find(s => s.status === 'aktif');
  const tagihan = mockDb.getTagihan();
  const idSewaAktif = penyewaan.filter(s => s.status === 'aktif').map(s => s.id_sewa);
  const tagihanTertunda = tagihan.filter(t => idSewaAktif.includes(t.id_sewa) && t.status !== 'lunas');
  const keluhan = mockDb.getKeluhan().filter(k => k.id_user === idUser);
  return {
    status: 'success',
    data: {
      kamar_saat_ini: aktif ? `Kamar ${aktif.no_kamar}` : null,
      status_kamar: aktif ? 'Aktif' : 'Tidak ada',
      sejak: aktif?.tanggal_masuk || null,
      tagihan_tertunda: tagihanTertunda.length,
      total_tagihan_tertunda: tagihanTertunda.reduce((s, t) => s + t.total_tagihan, 0),
      penyewaan_aktif: penyewaan.filter(s => s.status === 'aktif' || s.status === 'menunggu').length,
      keluhan_berjalan: keluhan.filter(k => k.status !== 'selesai').length,
    },
  };
}

export async function getAktivitas() {
  await delay();
  const items = [
    { id: 1, tipe: 'penyewaan', deskripsi: 'Budi mengajukan sewa Kamar B1', waktu: '2 jam lalu', status: 'Menunggu' },
    { id: 2, tipe: 'pembayaran', deskripsi: 'Andi melakukan pembayaran April 2026', waktu: '5 jam lalu', status: 'Menunggu Verifikasi' },
    { id: 3, tipe: 'keluhan', deskripsi: 'Keluhan #KL-001 — "AC bocor" dari Citra', waktu: '1 hari lalu', status: 'Baru' },
    { id: 4, tipe: 'tagihan', deskripsi: 'Tagihan April 2026 digenerate otomatis', waktu: '2 hari lalu', status: 'Berhasil' },
  ];
  return { status: 'success', data: items };
}
