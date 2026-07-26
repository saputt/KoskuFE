const map = {
  tersedia: 'badge-tersedia', terisi: 'badge-terisi', maintenance: 'badge-maintenance',
  menunggu: 'badge-menunggu', aktif: 'badge-aktif', ditolak: 'badge-ditolak', selesai: 'badge-selesai',
  belum_lunas: 'badge-belum-lunas', lunas: 'badge-lunas', terlambat: 'badge-terlambat',
  menunggu_verifikasi: 'badge-verifikasi', terverifikasi: 'badge-terverifikasi',
  baru: 'badge-baru', diproses: 'badge-diproses',
};

export default function Badge({ status, children }) {
  return <span className={`badge ${map[status] || 'badge-selesai'}`}>{children || status}</span>;
}
