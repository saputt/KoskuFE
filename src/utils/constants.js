export const ROLE = { PEMILIK: 'pemilik', PENGHUNI: 'penghuni' };

export const STATUS_KAMAR = { TERSEDIA: 'tersedia', TERISI: 'terisi', MAINTENANCE: 'maintenance' };

export const STATUS_PENYEWAAN = { MENUNGGU: 'menunggu', AKTIF: 'aktif', DITOLAK: 'ditolak', SELESAI: 'selesai' };

export const STATUS_TAGIHAN = { BELUM_LUNAS: 'belum_lunas', LUNAS: 'lunas', TERLAMBAT: 'terlambat' };

export const STATUS_PEMBAYARAN = { MENUNGGU_VERIFIKASI: 'menunggu_verifikasi', TERVERIFIKASI: 'terverifikasi', DITOLAK: 'ditolak' };

export const STATUS_KELUHAN = { BARU: 'baru', DIPROSES: 'diproses', SELESAI: 'selesai' };

export const METODE_PEMBAYARAN = { TRANSFER: 'transfer', TUNAI: 'tunai', QRIS: 'qris' };

export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PEMILIK: {
    DASHBOARD: '/pemilik/dashboard',
    KAMAR: '/pemilik/kamar',
    KAMAR_TAMBAH: '/pemilik/kamar/tambah',
    KAMAR_EDIT: (id) => `/pemilik/kamar/${id}/edit`,
    PENYEWAAN: '/pemilik/penyewaan',
    TAGIHAN: '/pemilik/tagihan',
    PEMBAYARAN: '/pemilik/pembayaran',
    KELUHAN: '/pemilik/keluhan',
    PROFIL: '/pemilik/profil',
  },
  PENGHUNI: {
    DASHBOARD: '/penghuni/dashboard',
    KAMAR: '/penghuni/kamar',
    PENYEWAAN: '/penghuni/penyewaan',
    PENYEWAAN_AJUKAN: '/penghuni/penyewaan/ajukan',
    TAGIHAN: '/penghuni/tagihan',
    TAGIHAN_BAYAR: (id) => `/penghuni/tagihan/bayar/${id}`,
    KELUHAN: '/penghuni/keluhan',
    PROFIL: '/penghuni/profil',
  },
};
