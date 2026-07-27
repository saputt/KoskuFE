import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const login = useAuthStore(s => s.login);
  const loadUser = useAuthStore(s => s.loadUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const ok = await login(email, password);
    if (!ok) { setError('Email atau password salah. Coba lagi.'); return; }
    await loadUser();
    const user = useAuthStore.getState().user;
    navigate(user?.role === 'pemilik' ? '/pemilik/dashboard' : '/penghuni/dashboard', { replace: true });
  };

  return (
    <>
      <span className="eyebrow">Selamat datang kembali</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '27px', letterSpacing: '-.3px', marginBottom: '8px' }}>Masuk ke akun</h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px', marginBottom: '34px' }}>Masukkan email dan password untuk melanjutkan.</p>

      {error && <div className="alert" style={{ display: 'block' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <div className="input-wrap"><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nama@email.com" required /></div>
        </div>
        <div className="field">
          <label>Password</label>
          <div className="input-wrap has-toggle">
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Masukkan password" required />
            <button type="button" className="toggle" onClick={() => setShowPw(!showPw)}>
              <svg className="icon" width="18" height="18" viewBox="0 0 24 24">
                {showPw
                  ? <><path d="M3 3l18 18"/><path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17.9 17.9 0 0 1-3.2 4.1M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.4 0 2.6-.2 3.7-.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>
                  : <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>
                }
              </svg>
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-solid" style={{ width: '100%' }}>Masuk</button>
      </form>

      <div className="divider-line"></div>
      <p className="foot">Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
    </>
  );
}
