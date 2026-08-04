import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="layout">
      <div className="form-panel">
        <div className="form-wrap">
          <Link to="/login" className="brand" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '19px', textDecoration: 'none', color: 'var(--ink)', marginBottom: '52px' }}>
            <span className="brand-mark" style={{ width: '32px', height: '32px', borderRadius: '7px', background: 'var(--pine)', color: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg className="icon" width="17" height="17" viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9"/></svg>
            </span>
            KosKu
          </Link>
          <Outlet />
        </div>
      </div>
      <div className="illus-panel">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px', maxWidth: '420px' }}>
          <div style={{ width: '132px', height: '132px', border: '2px solid rgba(193,137,47,.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', position: 'relative', transform: 'rotate(-8deg)' }}>
            <div style={{ position: 'absolute', inset: '10px', border: '1px solid rgba(193,137,47,.35)', borderRadius: '50%' }} />
            <svg className="icon" width="46" height="46" viewBox="0 0 24 24" style={{ color: 'var(--brass)' }}><circle cx="8" cy="15" r="4"/><path d="M11 12 20 3M17 6l3 3M14 9l2.5 2.5"/></svg>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '.12em', color: 'rgba(193,137,47,.85)', textTransform: 'uppercase' }}>Akses Terverifikasi</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '26px', color: 'var(--surface)', margin: '12px 0' }}>Kelola kos dari satu tempat</h2>
          <p style={{ color: 'rgba(250,248,242,.72)', fontSize: '15px', lineHeight: 1.65 }}>Kamar, tagihan, pembayaran, dan keluhan — semua terpantau begitu Anda masuk.</p>
        </div>
      </div>
    </div>
  );
}
