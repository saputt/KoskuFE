import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import { useTagihanList } from '../../features/tagihan/hooks/useTagihan';
import { formatCurrency, formatDate, formatPeriode } from '../../utils/formatter';
import { ROUTES } from '../../utils/constants';

export default function PenghuniTagihan() {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const { data, isLoading } = useTagihanList({ status: filter || undefined, sort: 'terbaru' });

  const tagihan = data?.data || [];

  return (
    <div>
      <div className="filter-bar">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">Semua Status</option>
          <option value="belum_lunas">Belum Lunas</option>
          <option value="lunas">Lunas</option>
          <option value="terlambat">Terlambat</option>
        </select>
        <select><option value="">Urutkan</option><option>Terbaru</option><option>Terlama</option></select>
      </div>

      {isLoading ? (
        <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>
      ) : (
        <table className="data-table">
          <thead><tr><th>Periode</th><th>Jatuh Tempo</th><th>Nominal</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {tagihan.map(t => (
              <tr key={t.id_tagihan}>
                <td>{formatPeriode(t.periode)}</td>
                <td>{formatDate(t.tanggal_jatuh_tempo)}</td>
                <td>{formatCurrency(t.total_tagihan)}</td>
                <td><Badge status={t.status}>{t.status === 'belum_lunas' ? 'Belum Lunas' : t.status}</Badge></td>
                <td>
                  {t.status !== 'lunas' ? (
                    <a href="#" className="btn btn-solid-sm" style={{ fontSize: '13px', padding: '8px 16px' }} onClick={e => { e.preventDefault(); navigate(ROUTES.PENGHUNI.TAGIHAN_BAYAR(t.id_tagihan)); }}>
                      <svg className="icon" width="14" height="14" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Bayar
                    </a>
                  ) : <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
