import { useState } from 'react';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import InfoModal from '../../components/ui/InfoModal';
import { useToast } from '../../components/ui/ToastContext';
import { useTagihanList, useGenerateTagihan, useUpdateTagihan } from '../../features/tagihan/hooks/useTagihan';
import { formatCurrency, formatDate, formatPeriode } from '../../utils/formatter';
import { getMessage } from '../../utils/messages';

export default function PemilikTagihan() {
  const [showGenerate, setShowGenerate] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  const [summary, setSummary] = useState(null);
  const [periode, setPeriode] = useState('2026-04');
  const [jatuhTempo, setJatuhTempo] = useState('2026-04-30');
  const [editNominal, setEditNominal] = useState('');
  const toast = useToast();

  const { data, isLoading } = useTagihanList({ sort: 'terbaru' });
  const generateMutation = useGenerateTagihan();
  const updateMutation = useUpdateTagihan();

  const tagihan = data?.data || [];

  const handleGenerate = async () => {
    try {
      const res = await generateMutation.mutateAsync({ periode, tanggal_jatuh_tempo: jatuhTempo });
      setSummary(res.data);
      setShowGenerate(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openEdit = (t) => {
    setShowEdit(t);
    setEditNominal(t.total_tagihan);
  };

  const handleEditSave = async () => {
    try {
      await updateMutation.mutateAsync({ id: showEdit.id_tagihan, data: { total_tagihan: Number(editNominal) } });
      toast.success(getMessage('M28').message);
    } catch (err) {
      toast.error(err.message);
    }
    setShowEdit(null);
  };

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar-left">
          <select><option value="">Semua Status</option><option>Belum Lunas</option><option>Lunas</option><option>Terlambat</option></select>
          <select><option value="">Urutkan</option><option>Terbaru</option><option>Terlama</option></select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline" onClick={() => setShowGenerate(true)}><svg className="icon" width="14" height="14" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16"/></svg> Generate Tagihan</button>
        </div>
      </div>

      {isLoading ? (
        <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>
      ) : (
        <table className="data-table">
          <thead><tr><th>Penghuni</th><th>Kamar</th><th>Periode</th><th>Jatuh Tempo</th><th>Nominal</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {tagihan.map(t => (
              <tr key={t.id_tagihan}>
                <td><strong>{t.nama_penghuni}</strong></td>
                <td>{t.no_kamar}</td>
                <td>{formatPeriode(t.periode)}</td>
                <td>{formatDate(t.tanggal_jatuh_tempo)}</td>
                <td>{formatCurrency(t.total_tagihan)}</td>
                <td><Badge status={t.status}>{t.status === 'belum_lunas' ? 'Belum Lunas' : t.status}</Badge></td>
                <td className="actions">
                  <button className="btn btn-sm-line" onClick={() => openEdit(t)}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M15 5l4 4"/><path d="M10 15l-2 1 1-2 8-8 3 3-8 8z"/><path d="M4 20h16"/></svg></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={showGenerate} onClose={() => setShowGenerate(false)} title="Generate Tagihan" subtitle="Tagihan akan dibuat otomatis untuk semua penyewaan aktif.">
        <div className="field"><label>Periode</label><div className="input-wrap"><input value={periode} onChange={e => setPeriode(e.target.value)} placeholder="2026-04" /></div></div>
        <div className="field"><label>Jatuh Tempo</label><div className="input-wrap"><input type="date" value={jatuhTempo} onChange={e => setJatuhTempo(e.target.value)} /></div></div>
        <div className="btn-group">
          <button className="btn btn-line" onClick={() => setShowGenerate(false)}>Batal</button>
          <button className="btn btn-solid" onClick={handleGenerate} disabled={generateMutation.isPending}>{generateMutation.isPending ? 'Memproses...' : 'Generate Sekarang'}</button>
        </div>
      </Modal>

      {showEdit && (
        <Modal open={!!showEdit} onClose={() => setShowEdit(null)} title="Edit Tagihan" subtitle="Ubah data tagihan yang dipilih.">
          <div className="field"><label>Tagihan</label><div className="input-wrap"><input value={`${formatPeriode(showEdit.periode)} — ${showEdit.nama_penghuni} (${showEdit.no_kamar})`} disabled /></div></div>
          <div className="field"><label>Nominal</label><div className="input-wrap"><input type="number" value={editNominal} onChange={e => setEditNominal(e.target.value)} /></div></div>
          <div className="btn-group">
            <button className="btn btn-line" onClick={() => setShowEdit(null)}>Batal</button>
            <button className="btn btn-solid" onClick={handleEditSave} disabled={updateMutation.isPending}>{updateMutation.isPending ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </Modal>
      )}

      <InfoModal
        open={!!summary}
        type={summary && summary.total > 0 ? 'success' : 'warning'}
        title={getMessage(summary && summary.total > 0 ? 'M26' : 'M27').title}
        description={getMessage(summary && summary.total > 0 ? 'M26' : 'M27').message}
        onClose={() => setSummary(null)}
      >
        {summary && summary.total > 0 && (
          <div className="detail-box">
            <div className="row"><span className="label">Periode</span><span>{formatPeriode(periode)}</span></div>
            <div className="row"><span className="label">Jumlah Tagihan</span><span>{summary.total}</span></div>
            <div className="row"><span className="label">Total Nominal</span><span>{formatCurrency(summary.total_nominal)}</span></div>
          </div>
        )}
      </InfoModal>
    </div>
  );
}
