import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getKamarList } from '../../features/kamar/api';
import { ajukanSewa } from '../../features/penyewaan/api';
import { formatCurrency } from '../../utils/formatter';
import { ROUTES } from '../../utils/constants';

export default function PenghuniAjukanSewa() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [kamar, setKamar] = useState(null);
  const [form, setForm] = useState({ id_kamar: '', tanggal_masuk: '', durasi: '6' });

  useEffect(() => {
    const id = params.get('kamar');
    if (id) {
      getKamarList({}).then(r => {
        const k = r.data.find(k => k.id_kamar === Number(id));
        if (k) { setKamar(k); setForm(f => ({ ...f, id_kamar: k.id_kamar })); }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ajukanSewa({ ...form, id_kamar: Number(form.id_kamar) });
    navigate(ROUTES.PENGHUNI.PENYEWAAN);
  };

  if (!kamar) return <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Pilih kamar dari halaman cari kamar.</p>;

  return (
    <div style={{ maxWidth: '720px' }}>
      <a href="#" className="back-link" onClick={e => { e.preventDefault(); navigate(ROUTES.PENGHUNI.KAMAR); }}>
        <svg className="icon" width="14" height="14" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        Kembali ke detail kamar
      </a>

      <div className="form-card">
        <h2>Ajukan Sewa Kamar {kamar.no_kamar}</h2>
        <p className="sub">Isi data di bawah untuk mengirim permintaan sewa ke pemilik kos.</p>

        <div className="summary-box">
          <div className="row"><span className="label">Kamar</span><span className="val">{kamar.no_kamar}</span></div>
          <div className="row"><span className="label">Harga Sewa</span><span className="val">{formatCurrency(kamar.harga_sewa)} / bulan</span></div>
          <div className="row"><span className="label">Kapasitas</span><span className="val">{kamar.kapasitas} orang</span></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field"><label>Tanggal Mulai Sewa <span className="req">*</span></label><div className="input-wrap"><input type="date" value={form.tanggal_masuk} onChange={e => setForm(f => ({ ...f, tanggal_masuk: e.target.value }))} required /></div></div>
          <div className="field">
            <label>Durasi Sewa <span className="req">*</span></label>
            <div className="input-wrap">
              <select value={form.durasi} onChange={e => setForm(f => ({ ...f, durasi: e.target.value }))}>
                <option value="3">3 bulan</option>
                <option value="6">6 bulan</option>
                <option value="12">12 bulan</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Catatan Tambahan</label><div className="input-wrap"><input value={form.catatan || ''} onChange={e => setForm(f => ({ ...f, catatan: e.target.value }))} placeholder="Contoh: butuh tambahan meja" /></div></div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn btn-line" onClick={() => navigate(ROUTES.PENGHUNI.KAMAR)}>Batal</button>
            <button type="submit" className="btn btn-solid"><svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Ajukan Sekarang</button>
          </div>
        </form>
      </div>
    </div>
  );
}
