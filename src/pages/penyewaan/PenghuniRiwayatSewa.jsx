import { useState, useEffect } from 'react';
import Badge from '../../components/ui/Badge';
import { getPenyewaanList } from '../../features/penyewaan/api';
import useAuthStore from '../../stores/authStore';
import { formatDate } from '../../utils/formatter';

export default function PenghuniRiwayatSewa() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    getPenyewaanList({ id_user: user.id_user, status: filter || undefined }).then(r => setData(r.data));
  }, [filter]);

  return (
    <div>
      <div className="filter-bar">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="menunggu">Menunggu Konfirmasi</option>
          <option value="ditolak">Ditolak</option>
          <option value="selesai">Selesai</option>
        </select>
        <select><option value="">Urutkan</option><option>Terbaru</option><option>Terlama</option></select>
      </div>

      <table className="data-table">
        <thead><tr><th>Kamar</th><th>Tanggal Masuk</th><th>Tanggal Selesai</th><th>Status</th></tr></thead>
        <tbody>
          {data.map(s => (
            <tr key={s.id_sewa}>
              <td><strong>{s.no_kamar}</strong></td>
              <td>{formatDate(s.tanggal_masuk)}</td>
              <td>{formatDate(s.tanggal_selesai)}</td>
              <td><Badge status={s.status}>{s.status === 'menunggu' ? 'Menunggu Konfirmasi' : s.status}</Badge></td>
            </tr>
          ))}
          {data.length === 0 && <tr><td colSpan={4} style={{ border: '1.5px dashed var(--line)', borderRadius: 'var(--radius)', padding: '48px 24px', textAlign: 'center', color: 'var(--ink-soft)' }}>Belum ada riwayat penyewaan.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
