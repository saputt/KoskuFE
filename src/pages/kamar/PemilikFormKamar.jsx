import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getKamarDetail, createKamar, updateKamar } from '../../features/kamar/api';
import { ROUTES } from '../../utils/constants';

export default function PemilikFormKamar() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState({ no_kamar: '', harga_sewa: '', kapasitas: '', status: 'tersedia', fasilitas: '' });

  useEffect(() => {
    if (isEdit) getKamarDetail(Number(id)).then(r => {
      const k = r.data;
      setForm({ no_kamar: k.no_kamar, harga_sewa: k.harga_sewa, kapasitas: k.kapasitas, status: k.status, fasilitas: k.fasilitas || '' });
    });
  }, [id]);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, harga_sewa: Number(form.harga_sewa), kapasitas: Number(form.kapasitas) };
    if (isEdit) await updateKamar(Number(id), payload);
    else await createKamar(payload);
    navigate(ROUTES.PEMILIK.KAMAR);
  };

  return (
    <div style={{ maxWidth: '720px' }}>
      <a href="#" className="back-link" onClick={e => { e.preventDefault(); navigate(ROUTES.PEMILIK.KAMAR); }}>
        <svg className="icon" width="14" height="14" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        Kembali ke daftar kamar
      </a>

      <div className="form-card">
        <h2>{isEdit ? 'Edit Kamar' : 'Tambah Kamar Baru'}</h2>
        <p className="sub">Isi data kamar yang akan ditambahkan ke sistem.</p>

        <form onSubmit={handleSubmit}>
          <div className="field"><label>Nomor Kamar <span className="req">*</span></label><div className="input-wrap"><input value={form.no_kamar} onChange={set('no_kamar')} placeholder="Contoh: A1, B2, C3" required /></div></div>
          <div className="field-row">
            <div className="field"><label>Harga Sewa <span className="req">*</span></label><div className="input-wrap"><input type="number" value={form.harga_sewa} onChange={set('harga_sewa')} placeholder="600000" required /></div></div>
            <div className="field"><label>Kapasitas <span className="req">*</span></label><div className="input-wrap"><input type="number" value={form.kapasitas} onChange={set('kapasitas')} placeholder="1" required /></div></div>
          </div>
          <div className="field">
            <label>Status Kamar <span className="req">*</span></label>
            <div className="input-wrap">
              <select value={form.status} onChange={set('status')}>
                <option value="tersedia">Tersedia</option>
                <option value="terisi">Terisi</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Fasilitas</label><div className="input-wrap"><input value={form.fasilitas} onChange={set('fasilitas')} placeholder="AC, Kasur, Lemari (pisahkan dengan koma)" /></div></div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn btn-line" onClick={() => navigate(ROUTES.PEMILIK.KAMAR)}>Batal</button>
            <button type="submit" className="btn btn-solid">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
