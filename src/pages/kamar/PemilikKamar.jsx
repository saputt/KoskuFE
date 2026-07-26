import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Table, { Td } from '../../components/ui/Table';
import { getKamarList, deleteKamar } from '../../features/kamar/api';
import { formatCurrency } from '../../utils/formatter';
import { ROUTES } from '../../utils/constants';

export default function PemilikKamar() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  const load = () => getKamarList({ search: search || undefined, status: filterStatus || undefined, sort: 'harga_asc' }).then(r => setData(r.data));
  useEffect(() => { load(); }, [search, filterStatus]);

  const handleDelete = async (id) => {
    if (!confirm('Hapus kamar ini?')) return;
    await deleteKamar(id);
    load();
  };

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari kamar..." />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">Semua Status</option>
            <option value="tersedia">Tersedia</option>
            <option value="terisi">Terisi</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-solid" onClick={() => navigate(ROUTES.PEMILIK.KAMAR_TAMBAH)}>
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg>
            Tambah Kamar
          </button>
        </div>
      </div>

      <table className="data-table">
        <thead><tr><th>No. Kamar</th><th>Harga Sewa</th><th>Kapasitas</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          {data.map(k => (
            <tr key={k.id_kamar}>
              <td><strong>{k.no_kamar}</strong></td>
              <td>{formatCurrency(k.harga_sewa)}</td>
              <td>{k.kapasitas} orang</td>
              <td><Badge status={k.status}>{k.status}</Badge></td>
              <td className="actions">
                <button className="btn btn-sm-line" onClick={() => navigate(ROUTES.PEMILIK.KAMAR_EDIT(k.id_kamar))}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M15 5l4 4"/><path d="M10 15l-2 1 1-2 8-8 3 3-8 8z"/><path d="M4 20h16"/></svg></button>
                <button className="btn btn-sm-line" style={{ color: 'var(--stamp)', borderColor: 'rgba(162,59,46,.3)' }} onClick={() => handleDelete(k.id_kamar)}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
              </td>
            </tr>
          ))}
          {data.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '48px 24px' }}>Belum ada kamar.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
