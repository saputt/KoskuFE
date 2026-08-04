import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import { useKamarList } from '../../features/kamar/hooks/useKamar';
import { formatCurrency } from '../../utils/formatter';
import { ROUTES } from '../../utils/constants';

export default function PenghuniKamar() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const { data, isLoading } = useKamarList({
    search: search || undefined,
    status: filter || undefined,
    sort: 'harga_asc',
  });

  const kamar = data?.data || [];

  return (
    <div>
      <div className="filter-bar">
        <div className="search-wrap">
          <svg className="icon" width="16" height="16" viewBox="0 0 24 24" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari kamar..." />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">Semua Status</option>
          <option value="tersedia">Tersedia</option>
          <option value="terisi">Terisi</option>
        </select>
        <select><option value="">Urutkan</option><option>Harga Terendah</option><option>Harga Tertinggi</option></select>
      </div>

      {isLoading ? (
        <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>
      ) : (
        <div className="room-grid">
          {kamar.map(k => (
            <div key={k.id_kamar} className="room-card" onClick={() => k.status === 'tersedia' && navigate(`${ROUTES.PENGHUNI.PENYEWAAN_AJUKAN}?kamar=${k.id_kamar}`)}>
              <div className="room-img">{`Kamar ${k.no_kamar}`}</div>
              <div className="room-no">{k.no_kamar}</div>
              <div className="room-price">{formatCurrency(k.harga_sewa)} / bulan</div>
              <div className="room-meta"><span>Kapasitas: {k.kapasitas}</span></div>
              <div style={{ marginTop: '12px' }}><Badge status={k.status}>{k.status}</Badge></div>
            </div>
          ))}
          {kamar.length === 0 && <p style={{ fontSize: '14px', color: 'var(--ink-soft)', gridColumn: '1/-1' }}>Belum ada kamar.</p>}
        </div>
      )}
    </div>
  );
}
