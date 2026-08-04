import { useState } from 'react';
import Badge from '../../components/ui/Badge';
import { useToast } from '../../components/ui/ToastContext';
import { useKeluhanList, useCreateKeluhan } from '../../features/keluhan/hooks/useKeluhan';
import { useKamarList } from '../../features/kamar/hooks/useKamar';
import { formatDate } from '../../utils/formatter';
import { getMessage } from '../../utils/messages';

export default function PenghuniKeluhan() {
  const [tab, setTab] = useState('ajukan');
  const [idKamar, setIdKamar] = useState('');
  const [isi, setIsi] = useState('');
  const toast = useToast();

  const { data, isLoading } = useKeluhanList({ sort: 'terbaru' });
  const { data: kamarData } = useKamarList();
  const createMutation = useCreateKeluhan();

  const keluhan = data?.data || [];
  const kamarList = kamarData?.data || [];

  const handleSubmit = async () => {
    if (!idKamar || !isi) {
      toast.warning(getMessage('M24').message);
      return;
    }
    try {
      await createMutation.mutateAsync({ id_kamar: idKamar, isi_keluhan: isi });
      toast.success(getMessage('M23').message);
      setIdKamar(''); setIsi(''); setTab('riwayat');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '820px' }}>
      <div className="tabs" style={{ marginBottom: '28px' }}>
        {['ajukan', 'riwayat'].map(t => (
          <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'ajukan' ? 'Ajukan Keluhan' : 'Riwayat Keluhan'}
          </button>
        ))}
      </div>

      {tab === 'ajukan' ? (
        <>
          <div className="field">
            <label>Kamar Terkait <span className="req">*</span></label>
            <div className="input-wrap">
              <select value={idKamar} onChange={e => setIdKamar(e.target.value)}>
                <option value="">Pilih kamar</option>
                {kamarList.map(k => <option key={k.id_kamar} value={k.id_kamar}>Kamar {k.no_kamar}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Isi Keluhan <span className="req">*</span></label>
            <div className="input-wrap">
              <textarea value={isi} onChange={e => setIsi(e.target.value)} placeholder="Jelaskan masalah yang Anda alami..." required />
            </div>
          </div>
          <button className="btn btn-solid" onClick={handleSubmit} disabled={createMutation.isPending}><svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg> {createMutation.isPending ? 'Memproses...' : 'Kirim Keluhan'}</button>
        </>
      ) : (
        <table className="data-table">
          <thead><tr><th>Tanggal</th><th>Kamar</th><th>Keluhan</th><th>Status</th></tr></thead>
          <tbody>
            {keluhan.map(k => (
              <tr key={k.id_keluhan}>
                <td>{formatDate(k.tanggal_keluhan)}</td>
                <td>{k.no_kamar}</td>
                <td>
                  {k.isi_keluhan}
                  {k.tanggapan && <div className="tanggapan">Tanggapan: {k.tanggapan}</div>}
                </td>
                <td><Badge status={k.status}>{k.status}</Badge></td>
              </tr>
            ))}
            {isLoading && <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '24px' }}>Memuat...</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
