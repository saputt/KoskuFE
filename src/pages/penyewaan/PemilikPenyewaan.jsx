import { useState } from 'react';
import Badge from '../../components/ui/Badge';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useToast } from '../../components/ui/ToastContext';
import { usePenyewaanList, useKonfirmasiSewa } from '../../features/penyewaan/hooks/usePenyewaan';
import { formatDate } from '../../utils/formatter';
import { getMessage } from '../../utils/messages';

export default function PemilikPenyewaan() {
  const [tab, setTab] = useState('konfirmasi');
  const [confirmAction, setConfirmAction] = useState(null);
  const toast = useToast();

  const { data, isLoading } = usePenyewaanList({
    status: tab === 'konfirmasi' ? 'menunggu' : undefined,
    sort: tab === 'konfirmasi' ? 'terlama' : 'terbaru',
  });
  const konfirmasiMutation = useKonfirmasiSewa();

  const penyewaan = data?.data || [];
  const isSetujui = confirmAction?.aksi === 'setujui';
  const msg = isSetujui ? getMessage('M12') : getMessage('M13');

  const handleConfirm = async () => {
    const { id, aksi } = confirmAction;
    try {
      await konfirmasiMutation.mutateAsync({ id, data: { aksi } });
      toast.success(getMessage(aksi === 'setujui' ? 'M14' : 'M15').message);
    } catch (err) {
      toast.error(err.message);
    }
    setConfirmAction(null);
  };

  return (
    <div>
      <div className="tabs">
        {['konfirmasi', 'aktif'].map(t => (
          <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'konfirmasi' ? 'Permintaan Konfirmasi' : 'Aktif & Riwayat'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>
      ) : (
        <table className="data-table">
          <thead><tr><th>Penghuni</th><th>Kamar</th><th>Tanggal Masuk</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {penyewaan.map(s => (
              <tr key={s.id_sewa}>
                <td><strong>{s.nama_penghuni}</strong></td>
                <td>{s.no_kamar}</td>
                <td>{formatDate(s.tanggal_masuk)}</td>
                <td><Badge status={s.status}>{s.status}</Badge></td>
                <td className="actions">
                  {s.status === 'menunggu' ? (
                    <>
                      <button className="btn btn-sm-success" onClick={() => setConfirmAction({ id: s.id_sewa, aksi: 'setujui' })}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg> Setujui</button>
                      <button className="btn btn-sm-danger" onClick={() => setConfirmAction({ id: s.id_sewa, aksi: 'tolak' })}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg> Tolak</button>
                    </>
                  ) : <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmModal
        open={!!confirmAction}
        title={msg.title}
        description={msg.message}
        confirmLabel={isSetujui ? 'Setujui' : 'Tolak'}
        danger={!isSetujui}
        loading={konfirmasiMutation.isPending}
        onCancel={() => setConfirmAction(null)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
