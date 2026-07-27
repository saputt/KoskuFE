import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import { getTagihanList } from '../../features/tagihan/api';
import { bayarTagihan, getPembayaranList } from '../../features/pembayaran/api';
import useAuthStore from '../../stores/authStore';
import { formatCurrency, formatDate } from '../../utils/formatter';
import { ROUTES } from '../../utils/constants';

export default function PenghuniBayar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const [tagihan, setTagihan] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [metode, setMetode] = useState('transfer');
  const [jumlah, setJumlah] = useState('');

  useEffect(() => {
    getTagihanList({ id_user: user.id_user }).then(r => {
      const t = r.data.find(t => t.id_tagihan === id);
      setTagihan(t);
      if (t) setJumlah(t.total_tagihan);
    });
    getPembayaranList({ id_user: user.id_user }).then(r => setRiwayat(r.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await bayarTagihan({ id_tagihan: id, metode_pembayaran: metode, jumlah_bayar: Number(jumlah) });
    navigate(ROUTES.PENGHUNI.TAGIHAN);
  };

  if (!tagihan) return <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>;

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
              <select value={metode} onChange={e => setMetode(e.target.value)}>
                <option value="">Pilih metode</option>
                <option value="transfer">Transfer Bank</option>
                <option value="tunai">Tunai</option>
                <option value="qris">QRIS</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Jumlah Dibayar <span className="req">*</span></label><div className="input-wrap"><input type="number" value={jumlah} onChange={e => setJumlah(e.target.value)} required /></div></div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn btn-line" onClick={() => navigate(ROUTES.PENGHUNI.TAGIHAN)}>Batal</button>
            <button type="submit" className="btn btn-solid" style={{ width: '100%' }}><svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Kirim Pembayaran</button>
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
    </div>
  );
}
