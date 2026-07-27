import { useState, useEffect } from 'react';
import Badge from '../../components/ui/Badge';
import Table, { Td } from '../../components/ui/Table';
import { getPembayaranList, verifikasiPembayaran, getLaporanPembayaran } from '../../features/pembayaran/api';
import { formatCurrency, formatDate } from '../../utils/formatter';

export default function PemilikPembayaran() {
  const [tab, setTab] = useState('verifikasi');
  const [data, setData] = useState([]);
  const [laporan, setLaporan] = useState(null);

  const load = () => {
    if (tab === 'verifikasi') getPembayaranList({ status: 'menunggu_verifikasi' }).then(r => setData(r.data));
    else getLaporanPembayaran().then(r => { setLaporan(r); setData(r.data); });
  };
  useEffect(() => { load(); }, [tab]);

  const handle = async (id, aksi) => { await verifikasiPembayaran(id, aksi); load(); };

  return (
    <div>
      <div className="tabs">
        {['verifikasi', 'laporan'].map(t => (
          <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'verifikasi' ? 'Verifikasi Pembayaran' : 'Laporan Pembayaran'}
          </button>
        ))}
      </div>

      {tab === 'laporan' && laporan && (
        <div className="summary-stats">
          <div className="summary-stat"><div className="num">{formatCurrency(laporan.total_pendapatan_bulan_ini)}</div><div className="label">Total Pendapatan (Bulan Ini)</div></div>
          <div className="summary-stat"><div className="num">{laporan.total_transaksi_bulan_ini}</div><div className="label">Jumlah Transaksi</div></div>
          <div className="summary-stat"><div className="num">{formatCurrency(laporan.total_pendapatan_semua)}</div><div className="label">Total Pendapatan (Semua)</div></div>
        </div>
      )}

      <table className="data-table">
        <thead><tr><th>Penghuni</th><th>Tagihan</th><th>Nominal</th><th>Metode</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          {data.map(p => (
            <tr key={p.id_pembayaran}>
              <td><strong>{p.nama_penghuni}</strong></td>
              <td>{p.periode_tagihan}</td>
              <td>{formatCurrency(p.jumlah_bayar)}</td>
              <td style={{ textTransform: 'capitalize' }}>{p.metode_pembayaran}</td>
              <td>{formatDate(p.tanggal_pembayaran)}</td>
              <td><Badge status={p.status}>{p.status === 'menunggu_verifikasi' ? 'Menunggu' : p.status === 'terverifikasi' ? 'Terverifikasi' : 'Ditolak'}</Badge></td>
              <td className="actions">
                {p.status === 'menunggu_verifikasi' ? (
                  <>
                    <button className="btn btn-sm-success" onClick={() => handle(p.id_pembayaran, 'verifikasi')}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg> Verifikasi</button>
                    <button className="btn btn-sm-danger" onClick={() => handle(p.id_pembayaran, 'tolak')}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg> Tolak</button>
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
