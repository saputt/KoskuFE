import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const features = [
  { tag: '01', icon: 'M9 4H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM19 4h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM9 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM19 13h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z', title: 'Pengajuan Sewa Online', desc: 'Penghuni mengajukan sewa langsung dari dashboard, pemilik tinggal menyetujui atau menolak.' },
  { tag: '02', icon: 'M6 3h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3zM8.5 8h7M8.5 11h7M8.5 14h4', title: 'Tagihan Otomatis', desc: 'Tagihan terbit sendiri setiap periode berdasarkan data penyewaan yang sudah dikonfirmasi.' },
  { tag: '03', icon: 'M3 6h18v13H3V6zm0 4h18M6.5 15h4', title: 'Pembayaran & Verifikasi', desc: 'Bayar tagihan dari dashboard, pemilik memverifikasi tanpa perlu cek rekening manual.' },
  { tag: '04', icon: 'M4 5h16v11H9l-4 4v-4H4zM12 8v4M12 15.5h.01', title: 'Pengaduan Tercatat', desc: 'Keluhan terkait kamar tersimpan rapi dan mendapat tanggapan yang bisa dilacak statusnya.' },
  { tag: '05', icon: 'M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z', title: 'Dashboard Real-time', desc: 'Status kamar, tagihan, dan laporan keuangan terlihat dalam satu papan kendali.' },
  { tag: '06', icon: 'M3 4h18v12H3V4zm0 16h18', title: 'Akses Kapan Saja', desc: 'Buka dari browser desktop mana pun, data selalu tersinkron dan terbaru.' },
];

const rooms = ['A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','C3','C4','D1','D2','D3','D4'];
const terisi = new Set(['A2','B1','B4','C3','D2']);

export default function Landing() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.15 });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)', background: 'var(--paper)' }}>
      <nav className="navbar">
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" className="brand">
            <span className="brand-mark" style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'var(--brass)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pine-dark)' }}>
              <svg className="icon" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9"/></svg>
            </span>
            KosKu
          </Link>
          <ul className="nav-menu">
            <li><a href="#beranda">Beranda</a></li>
            <li><a href="#fitur">Fitur</a></li>
            <li><a href="#tentang">Tentang</a></li>
          </ul>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-line" style={{ borderColor: 'rgba(250,248,242,.35)', color: 'var(--surface)' }}>Masuk</Link>
            <Link to="/register" className="btn btn-solid">Daftar</Link>
          </div>
        </div>
      </nav>

      <section className="hero" id="beranda">
        <div className="container">
          <div className="hero-copy">
            <span className="eyebrow" style={{ color: 'var(--brass-dark)' }}>Sistem Manajemen Kos</span>
            <h1>Kelola kos lebih rapi,<br />cari kos lebih cepat.</h1>
            <p className="lede">Penghuni mengajukan sewa dan membayar tagihan langsung dari dashboard.</p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-solid">Daftar Sekarang →</Link>
              <Link to="/login" className="btn btn-line" style={{ borderColor: 'rgba(250,248,242,.35)', color: 'var(--surface)' }}>Masuk</Link>
            </div>
            <div className="ledger">
              <div className="ledger-row"><span>Kamar tersedia</span><span className="leader"></span><span className="val">500+</span></div>
              <div className="ledger-row"><span>Penghuni aktif</span><span className="leader"></span><span className="val">200+</span></div>
              <div className="ledger-row"><span>Pemilik terdaftar</span><span className="leader"></span><span className="val">50+</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="board">
              <div className="board-head"><h3>Papan Kamar — Blok A &amp; B</h3><span>Hari ini</span></div>
              <div className="room-grid-lp">
                {rooms.map((c, i) => {
                  const avail = !terisi.has(c);
                  return <div key={c} className={`room-tile${avail ? ' tersedia' : ''}`}><span>{c}</span><span className="dot"></span></div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="fitur">
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px' }}>
          <div className="section-head reveal">
            <span className="eyebrow" style={{ color: 'var(--brass-dark)' }}>Fitur</span>
            <h2>Satu platform untuk seluruh alur kos</h2>
            <p>Dari kamar kosong sampai tagihan lunas, semua tercatat di tempat yang sama.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature reveal">
                <span className="tag">{f.tag}</span>
                <div className="feature-icon"><svg className="icon" width="20" height="20" viewBox="0 0 24 24"><path d={f.icon}/></svg></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px' }}>
          <div className="stamp-ring reveal"><svg className="icon" width="34" height="34" viewBox="0 0 24 24"><path d="M9 21h6M12 21v-5"/><path d="M7 16h10l-1.5-6a3.5 3.5 0 0 0-7 0z"/><circle cx="12" cy="6.5" r="2.5"/></svg></div>
          <h2 className="reveal">Siap mencari atau mengelola kos?</h2>
          <p className="reveal">Daftar sekarang, gratis untuk penghuni.</p>
          <Link to="/register" className="btn" style={{ background: 'var(--brass)', borderColor: 'var(--brass)', color: 'var(--pine-dark)' }}>Daftar Sekarang →</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div><div className="footer-brand"><span className="brand-mark" style={{ width: '32px', height: '32px', borderRadius: '7px', background: 'var(--pine)', color: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg className="icon" width="17" height="17" viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9"/></svg></span>KosKu</div><p className="desc">Platform manajemen kos yang menghubungkan penghuni dan pemilik dalam satu alur kerja yang sama.</p></div>
          <div><h4>Navigasi</h4><ul className="footer-links"><li><a href="#beranda">Beranda</a></li><li><a href="#fitur">Fitur</a></li></ul></div>
          <div><h4>Akun</h4><ul className="footer-links"><li><Link to="/login">Masuk</Link></li><li><Link to="/register">Daftar</Link></li></ul></div>
          <div><h4>Kontak</h4><ul className="footer-links" style={{ gap: '12px', color: 'var(--ink-soft)', fontSize: '13.5px' }}><li>support@kosku.id</li><li>+62 812-3456-7890</li></ul></div>
        </div>
        <div className="tear"><span>&copy; 2026 KosKu.</span></div>
      </footer>
    </div>
  );
}
