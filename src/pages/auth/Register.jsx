import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

export default function Register() {
  const [form, setForm] = useState({ nama: '', email: '', no_hp: '', password: '', konfirmasi: '' });
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState('');
  const register = useAuthStore(s => s.register);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (form.password !== form.konfirmasi) { setErr('Password dan konfirmasi tidak cocok.'); return; }
    try {
      await register({ nama: form.nama, email: form.email, no_hp: form.no_hp, password: form.password, role: 'penghuni' });
      const user = useAuthStore.getState().user;
      navigate(user?.role === 'pemilik' ? '/pemilik/dashboard' : '/penghuni/dashboard', { replace: true });
    } catch (err) {
      setErr(err.message || 'Email sudah terdaftar.');
    }
  };

  return (
    <>
      <span className="eyebrow">Penghuni Baru</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', letterSpacing: '-.3px', marginBottom: '8px' }}>Buat akun baru</h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px', marginBottom: '28px' }}>Daftar sebagai penghuni untuk mulai mencari kos.</p>

      {err && <div className="alert" style={{ display: 'block' }}>{err}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field"><label>Nama lengkap <span className="req">*</span></label><div className="input-wrap"><input value={form.nama} onChange={set('nama')} placeholder="Masukkan nama lengkap" required /></div></div>
        <div className="field"><label>Email <span className="req">*</span></label><div className="input-wrap"><input type="email" value={form.email} onChange={set('email')} placeholder="nama@email.com" required /></div></div>
        <div className="field"><label>Nomor HP <span className="req">*</span></label><div className="input-wrap"><input value={form.no_hp} onChange={set('no_hp')} placeholder="0812-3456-7890" required /></div></div>
        <div className="field">
          <label>Password <span className="req">*</span></label>
          <div className="input-wrap has-toggle">
            <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Minimal 8 karakter" required minLength={8} />
            <button type="button" className="toggle" onClick={() => setShowPw(!showPw)}>
              <svg className="icon" width="18" height="18" viewBox="0 0 24 24">
                {showPw
                  ? <><path d="M3 3l18 18"/><path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17.9 17.9 0 0 1-3.2 4.1M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.4 0 2.6-.2 3.7-.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>
                  : <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>
                }
              </svg>
            </button>
          </div>
          <p className="hint">Gunakan kombinasi huruf dan angka.</p>
        </div>
        <div className="field"><label>Konfirmasi password <span className="req">*</span></label><div className="input-wrap"><input type="password" value={form.konfirmasi} onChange={set('konfirmasi')} placeholder="Masukkan ulang password" required /></div></div>
        <button type="submit" className="btn btn-solid" style={{ width: '100%' }}>Daftar</button>
      </form>

      <div className="divider-line"></div>
      <p className="foot">Sudah punya akun? <Link to="/login">Masuk di sini</Link></p>
    </>
  );
}
