import { useState } from 'react';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../components/ui/ToastContext';
import { useKeluhanList, useTanggapiKeluhan } from '../../features/keluhan/hooks/useKeluhan';
import { formatDate } from '../../utils/formatter';
import { getMessage } from '../../utils/messages';

export default function PemilikKeluhan() {
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(null);
  const [tanggapan, setTanggapan] = useState('');
  const [statusBaru, setStatusBaru] = useState('diproses');
  const toast = useToast();

  const { data, isLoading } = useKeluhanList({ status: filter || undefined, sort: 'terbaru' });
  const tanggapiMutation = useTanggapiKeluhan();

  const keluhan = data?.data || [];

  const handleKirim = async () => {
    try {
      await tanggapiMutation.mutateAsync({ id: showModal.id_keluhan, data: { tanggapan, status: statusBaru } });
      toast.success(getMessage('M25').message);
    } catch (err) {
      toast.error(err.message);
    }
    setShowModal(null); setTanggapan('');
  };

  return (
    <div>
      <div className="filter-bar">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">Semua Status</option>
          <option value="baru">Baru</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
        </select>
        <select><option value="">Urutkan</option><option>Terbaru</option><option>Terlama</option></select>
      </div>

      {isLoading ? (
        <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>
      ) : (
        <table className="data-table">
          <thead><tr><th>Tanggal</th><th>Penghuni</th><th>Kamar</th><th>Keluhan</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {keluhan.map(k => (
              <tr key={k.id_keluhan}>
                <td>{formatDate(k.tanggal_keluhan)}</td>
                <td><strong>{k.nama_penghuni}</strong></td>
                <td>{k.no_kamar}</td>
                <td>
                  <div className="keluhan-ringkas">{k.isi_keluhan}</div>
                  {k.tanggapan && <div className="tanggapan">Tanggapan: {k.tanggapan}</div>}
                </td>
                <td><Badge status={k.status}>{k.status}</Badge></td>
                <td className="actions">
                  {k.status !== 'selesai' ? (
                    <button className="btn btn-sm-success" onClick={() => setShowModal(k)}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Tanggapi</button>
                  ) : <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>—</span>}
                </td>
              </tr>
            ))}
            {keluhan.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '48px 24px' }}>Belum ada keluhan.</td></tr>}
          </tbody>
        </table>
      )}

      <Modal open={!!showModal} onClose={() => setShowModal(null)} title="Tanggapi Keluhan" subtitle="Berikan tanggapan dan perbarui status keluhan.">
        {showModal && <>
          <div className="detail-box">
            <div className="row"><span className="label">Penghuni</span><span>{showModal.nama_penghuni}</span></div>
            <div className="row"><span className="label">Kamar</span><span>{showModal.no_kamar}</span></div>
            <div className="row"><span className="label">Tanggal</span><span>{formatDate(showModal.tanggal_keluhan)}</span></div>
            <div className="row" style={{ borderTop: '1px solid var(--line)', paddingTop: '8px', marginTop: '4px' }}><span className="label">Isi Keluhan</span><span style={{ textAlign: 'right', maxWidth: '60%' }}>{showModal.isi_keluhan}</span></div>
          </div>
          <div className="field">
            <label>Tanggapan <span className="req">*</span></label>
            <textarea value={tanggapan} onChange={e => setTanggapan(e.target.value)} placeholder="Tulis tanggapan Anda..." required />
          </div>
          <div className="field">
            <label>Perbarui Status</label>
            <select value={statusBaru} onChange={e => setStatusBaru(e.target.value)}>
              <option value="baru">Baru</option>
              <option value="diproses">Diproses</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
          <div className="btn-group">
            <button className="btn btn-sm-line" onClick={() => setShowModal(null)}>Batal</button>
            <button className="btn btn-sm-success" onClick={handleKirim} disabled={tanggapiMutation.isPending}>{tanggapiMutation.isPending ? 'Memproses...' : 'Kirim Tanggapan'}</button>
          </div>
        </>}
      </Modal>
    </div>
  );
}
