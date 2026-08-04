import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useToast } from '../../components/ui/ToastContext';
import { useTagihanDetail } from '../../features/tagihan/hooks/useTagihan';
import { usePembayaranList, useBayarTagihan } from '../../features/pembayaran/hooks/usePembayaran';
import { formatCurrency, formatDate, formatPeriode } from '../../utils/formatter';
import { ROUTES } from '../../utils/constants';
import { getMessage } from '../../utils/messages';

export default function PenghuniBayar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [metode, setMetode] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [bukti, setBukti] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const toast = useToast();

  const { data: tagihanData, isLoading } = useTagihanDetail(id);
  const { data: pembayaranData } = usePembayaranList();
  const bayarMutation = useBayarTagihan();

  const tagihan = tagihanData?.data || null;
  const riwayat = pembayaranData?.data || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!metode || !jumlah) return;
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append('id_tagihan', tagihan.id_tagihan);
    formData.append('metode_pembayaran', metode);
    formData.append('jumlah_bayar', String(Number(jumlah)));
    if (bukti) formData.append('bukti_bayar', bukti);
    try {
      await bayarMutation.mutateAsync(formData);
      toast.success(getMessage('M17').message);
      navigate(ROUTES.PENGHUNI.TAGIHAN);
    } catch (err) {
      toast.error(err.message || getMessage('M18').message);
      setShowConfirm(false);
    }
  };

  if (isLoading) return <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>;
  if (!tagihan) return <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Tagihan tidak ditemukan.</p>;

  return (
    <div style={{ maxWidth: '820px' }}>
      <a href="#" className="back-link" onClick={e => { e.preventDefault(); navigate(ROUTES.PENGHUNI.TAGIHAN); }}>
        <svg className="icon" width="14" height="14" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        Kembali ke daftar tagihan
      </a>

      <div className="form-card" style={{ marginBottom: '32px' }}>
        <h2>Bayar Tagihan</h2>
        <p className="sub">Lengkapi data pembayaran untuk tagihan yang dipilih.</p>

        <div className="summary-box">
          <div className="row"><span className="label">Tagihan</span><span className="val">{tagihan.periode}</span></div>
          <div className="row"><span className="label">Jatuh Tempo</span><span className="val">{formatDate(tagihan.tanggal_jatuh_tempo)}</span></div>
          <div className="row"><span className="label">Total Tagihan</span><span className="val">{formatCurrency(tagihan.total_tagihan)}</span></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Metode Pembayaran <span className="req">*</span></label>
            <div className="input-wrap">
              <select value={metode} onChange={e => setMetode(e.target.value)} required>
                <option value="">Pilih metode</option>
                <option value="transfer">Transfer Bank</option>
                <option value="tunai">Tunai</option>
                <option value="qris">QRIS</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Jumlah Dibayar <span className="req">*</span></label><div className="input-wrap"><input type="number" value={jumlah} onChange={e => setJumlah(e.target.value)} required /></div></div>
          <div className="field">
            <label>Bukti Bayar</label>
            <div className="input-wrap"><input type="file" accept="image/*" onChange={e => setBukti(e.target.files[0] || null)} /></div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn btn-line" onClick={() => navigate(ROUTES.PENGHUNI.TAGIHAN)}>Batal</button>
            <button type="submit" className="btn btn-solid" style={{ width: '100%' }} disabled={bayarMutation.isPending}><svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg> {bayarMutation.isPending ? 'Memproses...' : 'Kirim Pembayaran'}</button>
          </div>
        </form>
      </div>

      <h3 className="recent-title">Riwayat Pembayaran</h3>
      <table className="data-table">
        <thead><tr><th>Tanggal</th><th>Tagihan</th><th>Metode</th><th>Nominal</th><th>Status</th></tr></thead>
        <tbody>
          {riwayat.map(p => (
            <tr key={p.id_pembayaran}>
              <td>{formatDate(p.tanggal_pembayaran)}</td>
              <td>{p.periode_tagihan}</td>
              <td style={{ textTransform: 'capitalize' }}>{p.metode_pembayaran}</td>
              <td>{formatCurrency(p.jumlah_bayar)}</td>
              <td><Badge status={p.status}>{p.status === 'terverifikasi' ? 'Terverifikasi' : 'Menunggu Verifikasi'}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        open={showConfirm}
        title={getMessage('M16').title}
        description={getMessage('M16').message}
        confirmLabel="Kirim Pembayaran"
        loading={bayarMutation.isPending}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
      >
        <div className="detail-box">
          <div className="row"><span className="label">Tagihan</span><span>{formatPeriode(tagihan.periode)}</span></div>
          <div className="row"><span className="label">Jatuh Tempo</span><span>{formatDate(tagihan.tanggal_jatuh_tempo)}</span></div>
          <div className="row"><span className="label">Metode</span><span style={{ textTransform: 'capitalize' }}>{metode}</span></div>
          <div className="row"><span className="label">Nominal</span><span>{formatCurrency(jumlah)}</span></div>
          <div className="row"><span className="label">Bukti Bayar</span><span>{bukti ? bukti.name : 'Tanpa bukti'}</span></div>
        </div>
      </ConfirmModal>
    </div>
  );
}
