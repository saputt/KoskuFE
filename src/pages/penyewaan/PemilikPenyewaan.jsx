import { useState, useEffect } from 'react';
import Badge from '../../components/ui/Badge';
import Table, { Td } from '../../components/ui/Table';
import { getPenyewaanList, konfirmasiSewa } from '../../features/penyewaan/api';
import { formatDate } from '../../utils/formatter';

export default function PemilikPenyewaan() {
  const [tab, setTab] = useState('konfirmasi');
  const [data, setData] = useState([]);

  const load = () => {
    const status = tab === 'konfirmasi' ? 'menunggu' : undefined;
    getPenyewaanList({ status }).then(r => setData(r.data));
  };

  useEffect(() => { load(); }, [tab]);

  const handle = async (id, aksi) => { await konfirmasiSewa(id, aksi); load(); };

  return (
    <div>
      <div className="tabs">
        {['konfirmasi', 'aktif'].map(t => (
          <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'konfirmasi' ? 'Permintaan Konfirmasi' : 'Aktif & Riwayat'}
          </button>
        ))}
      </div>

      <table className="data-table">
        <thead><tr><th>Penghuni</th><th>Kamar</th><th>Tanggal Masuk</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          {data.map(s => (
            <tr key={s.id_sewa}>
              <td><strong>{s.nama_penghuni}</strong></td>
              <td>{s.no_kamar}</td>
              <td>{formatDate(s.tanggal_masuk)}</td>
              <td><Badge status={s.status}>{s.status}</Badge></td>
              <td className="actions">
                {s.status === 'menunggu' ? (
                  <>
                    <button className="btn btn-sm-success" onClick={() => handle(s.id_sewa, 'setujui')}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg> Setujui</button>
                    <button className="btn btn-sm-danger" onClick={() => handle(s.id_sewa, 'tolak')}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg> Tolak</button>
                  </>
                ) : <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
