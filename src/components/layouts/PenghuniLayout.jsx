import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { ROUTES } from '../../utils/constants';

const d = {
  house: 'M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9',
  dashboard: 'M3 3h8v10H3V3zm10 0h8v6h-8V3zm0 8h8v10h-8V11zM3 15h8v6H3v-6z',
  grid: 'M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z',
  receipt: 'M6 3h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3zM8.5 8h7M8.5 11h7M8.5 14h4',
  card: 'M3 6h18v13H3V6zm0 4h18M6.5 15h4',
  alert: 'M4 5h16v11H9l-4 4v-4H4zM12 8v4M12 15.5h.01',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  bell: 'M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6zM10 19a2 2 0 0 0 4 0',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
};

const nav = [
  { to: ROUTES.PENGHUNI.DASHBOARD, label: 'Beranda', icon: 'dashboard' },
  { to: ROUTES.PENGHUNI.KAMAR, label: 'Cari Kamar', icon: 'grid' },
  { to: ROUTES.PENGHUNI.PENYEWAAN, label: 'Penyewaan Saya', icon: 'receipt' },
  { to: ROUTES.PENGHUNI.TAGIHAN, label: 'Tagihan', icon: 'card', badge: 2 },
  { to: ROUTES.PENGHUNI.KELUHAN, label: 'Keluhan', icon: 'alert', badge: 1 },
  { to: ROUTES.PENGHUNI.PROFIL, label: 'Profil', icon: 'user' },
];

export default function PenghuniLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <div className="app">
      <aside className="sidebar">
        <Link to={ROUTES.PENGHUNI.DASHBOARD} className="brand">
          <span className="brand-mark"><svg className="icon" width="17" height="17" viewBox="0 0 24 24"><path d={d.house}/></svg></span>
          KosKu
        </Link>
        <nav className="side-nav">
          {nav.map(item => {
            const active = pathname === item.to || (item.to !== ROUTES.PENGHUNI.DASHBOARD && pathname.startsWith(item.to));
            return (
              <Link key={item.to} to={item.to} className={active ? 'active' : ''}>
                <svg className="icon" width="17" height="17" viewBox="0 0 24 24"><path d={d[item.icon]}/></svg>
                {item.label}
                {item.badge && <span className="badge-side">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="side-logout">
          <button onClick={() => { logout(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: 'var(--radius-sm)', color: 'rgba(250,248,242,.5)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <svg className="icon" width="17" height="17" viewBox="0 0 24 24"><path d={d.logout}/></svg> Keluar
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <span className="eyebrow">Dashboard /</span>
            <h1>{nav.find(n => pathname.startsWith(n.to))?.label || 'KosKu'}</h1>
          </div>
          <div className="topbar-actions">
            <button className="icon-btn" aria-label="Notifikasi"><svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.bell}/></svg></button>
            <div className="avatar">{user?.nama?.charAt(0)?.toUpperCase() || '?'}</div>
          </div>
        </header>
        <div className="content"><Outlet /></div>
      </main>
    </div>
  );
}
