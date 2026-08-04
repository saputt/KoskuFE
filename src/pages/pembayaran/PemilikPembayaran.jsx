import { useState } from 'react';
import Badge from '../../components/ui/Badge';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useToast } from '../../components/ui/ToastContext';
import { usePembayaranList, useLaporanPembayaran, useVerifikasiPembayaran } from '../../features/pembayaran/hooks/usePembayaran';
import { formatCurrency, formatDate, formatPeriode } from '../../utils/formatter';
import { getMessage } from '../../utils/messages';

export default function PemilikPembayaran() {
  const [tab, setTab] = useState('verifikasi');
  const [confirmAction, setConfirmAction] = useState(null);
  const toast = useToast();

  const { data: listData, isLoading: listLoading } = usePembayaranList({ status: 'menunggu_verifikasi' });
  const { data: laporan, isLoading: laporanLoading } = useLaporanPembayaran();
  const verifikasiMutation = useVerifikasiPembayaran();

  const data = tab === 'verifikasi' ? listData?.data || [] : laporan?.data || [];
  const isVerifikasi = confirmAction?.aksi === 'verifikasi';
  const msg = isVerifikasi ? getMessage('M19') : getMessage('M20');

  const handleConfirm = async () => {
    const { id, aksi } = confirmAction;
    try {
      await verifikasiMutation.mutateAsync({ id, data: { aksi } });
      toast.success(getMessage(aksi === 'verifikasi' ? 'M21' : 'M22').message);
    } catch (err) {
      toast.error(err.message);
    }
    setConfirmAction(null);
  };

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

      {(listLoading || laporanLoading) ? (
        <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>
      ) : (
        <table className="data-table">
          <thead><tr><th>Penghuni</th><th>Tagihan</th><th>Nominal</th><th>Metode</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {data.map(p => (
              <tr key={p.id_pembayaran}>
                <td><strong>{p.nama_penghuni}</strong></td>
                <td>{formatPeriode(p.periode_tagihan)}</td>
                <td>{formatCurrency(p.jumlah_bayar)}</td>
                <td style={{ textTransform: 'capitalize' }}>{p.metode_pembayaran}</td>
                <td>{formatDate(p.tanggal_pembayaran)}</td>
                <td><Badge status={p.status}>{p.status === 'menunggu_verifikasi' ? 'Menunggu' : p.status === 'terverifikasi' ? 'Terverifikasi' : 'Ditolak'}</Badge></td>
                <td className="actions">
                  {p.status === 'menunggu_verifikasi' ? (
                    <>
                      <button className="btn btn-sm-success" onClick={() => setConfirmAction({ id: p.id_pembayaran, aksi: 'verifikasi' })}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg> Verifikasi</button>
                      <button className="btn btn-sm-danger" onClick={() => setConfirmAction({ id: p.id_pembayaran, aksi: 'tolak' })}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg> Tolak</button>
                    </>
                  ) : <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>—</span>}
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '48px 24px' }}>Belum ada pembayaran.</td></tr>}
          </tbody>
        </table>
      )}

      <ConfirmModal
        open={!!confirmAction}
        title={msg.title}
        description={msg.message}
        confirmLabel={isVerifikasi ? 'Verifikasi' : 'Tolak'}
        danger={!isVerifikasi}
        loading={verifikasiMutation.isPending}
        onCancel={() => setConfirmAction(null)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
