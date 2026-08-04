const MESSAGES = {
  M01: { title: 'Login Gagal', message: 'Email atau password yang dimasukkan salah.', type: 'error' },
  M02: { title: 'Registrasi Berhasil', message: 'Akun baru berhasil dibuat, Anda akan diarahkan ke halaman login.', type: 'success' },
  M03: { title: 'Email Terdaftar', message: 'Email sudah digunakan oleh akun lain.', type: 'error' },
  M04: { title: 'Password Tidak Cocok', message: 'Konfirmasi password tidak sesuai dengan password yang dimasukkan.', type: 'warning' },
  M05: { title: 'Kamar Ditambahkan', message: 'Kamar baru berhasil ditambahkan ke dalam sistem.', type: 'success' },
  M06: { title: 'Kamar Diperbarui', message: 'Data kamar berhasil diperbarui.', type: 'success' },
  M07: { title: 'Hapus Kamar', message: 'Yakin ingin menghapus data kamar ini dari sistem?', type: 'confirm' },
  M08: { title: 'Kamar Dihapus', message: 'Kamar berhasil dihapus dari sistem.', type: 'success' },
  M09: { title: 'Kamar Tidak Ditemukan', message: 'Kamar yang dimaksud tidak ditemukan di dalam database.', type: 'error' },
  M10: { title: 'Pengajuan Sewa Terkirim', message: 'Permintaan sewa berhasil dikirim dan menunggu konfirmasi pemilik.', type: 'success' },
  M11: { title: 'Kamar Tidak Tersedia', message: 'Kamar yang dipilih sedang tidak tersedia untuk disewa.', type: 'warning' },
  M12: { title: 'Setujui Penyewaan', message: 'Yakin ingin menyetujui permintaan sewa dari penghuni?', type: 'confirm' },
  M13: { title: 'Tolak Penyewaan', message: 'Yakin ingin menolak permintaan sewa dari penghuni?', type: 'confirm' },
  M14: { title: 'Penyewaan Disetujui', message: 'Permintaan sewa telah disetujui dan status berubah menjadi aktif.', type: 'success' },
  M15: { title: 'Penyewaan Ditolak', message: 'Permintaan sewa telah ditolak oleh pemilik.', type: 'info' },
  M16: { title: 'Konfirmasi Pembayaran', message: 'Periksa kembali rincian pembayaran sebelum dikirim.', type: 'confirm' },
  M17: { title: 'Pembayaran Terkirim', message: 'Pembayaran berhasil dikirim dan menunggu verifikasi pemilik.', type: 'success' },
  M18: { title: 'Tagihan Tidak Ditemukan', message: 'Tagihan yang akan dibayar tidak ditemukan di dalam sistem.', type: 'error' },
  M19: { title: 'Verifikasi Pembayaran', message: 'Yakin ingin memverifikasi pembayaran yang dilakukan penghuni?', type: 'confirm' },
  M20: { title: 'Tolak Pembayaran', message: 'Yakin ingin menolak pembayaran yang dilakukan penghuni?', type: 'confirm' },
  M21: { title: 'Pembayaran Terverifikasi', message: 'Pembayaran berhasil diverifikasi dan status tagihan berubah menjadi lunas.', type: 'success' },
  M22: { title: 'Pembayaran Ditolak', message: 'Pembayaran berhasil ditolak oleh pemilik.', type: 'info' },
  M23: { title: 'Keluhan Terkirim', message: 'Keluhan berhasil dikirim dan akan segera ditindaklanjuti.', type: 'success' },
  M24: { title: 'Keluhan Tidak Boleh Kosong', message: 'Isi keluhan tidak boleh dikirim dalam keadaan kosong.', type: 'warning' },
  M25: { title: 'Tanggapan Terkirim', message: 'Tanggapan terhadap keluhan berhasil dikirim ke penghuni.', type: 'success' },
  M26: { title: 'Tagihan Digenerate', message: 'Berikut ringkasan hasil generate tagihan.', type: 'info' },
  M27: { title: 'Tidak Ada Penyewaan Aktif', message: 'Tidak ada penyewaan aktif sehingga tidak ada tagihan yang dapat digenerate.', type: 'warning' },
  M28: { title: 'Tagihan Diperbarui', message: 'Data tagihan berhasil diperbarui.', type: 'success' },
  M29: { title: 'Keluar Aplikasi', message: 'Yakin ingin keluar dari aplikasi?', type: 'confirm' },
};

export function getMessage(code, overrides = {}) {
  const base = MESSAGES[code] || { title: code, message: '', type: 'info' };
  return {
    code,
    title: overrides.title ?? base.title,
    message: overrides.message ?? base.message,
    type: overrides.type ?? base.type,
  };
}

export const MESSAGE_CODES = Object.keys(MESSAGES);
