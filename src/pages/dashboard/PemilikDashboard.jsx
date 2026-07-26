import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { getDashboardPemilik, getAktivitas } from '../../features/dashboard/api';
import { formatCurrency } from '../../utils/formatter';
import { ROUTES } from '../../utils/constants';

const d = {
  grid: 'M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z',
  receipt: 'M6 3h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3zM8.5 8h7M8.5 11h7M8.5 14h4',
  card: 'M3 6h18v13H3V6zm0 4h18',
  check: 'M5 12l5 5L19 7',
  alert: 'M4 5h16v11H9l-4 4v-4H4zM12 8v4M12 15.5h.01',
  arrow: 'M5 12h14M13 6l6 6-6 6',
};

export default function PemilikDashboard() {
  const [stats, setStats] = useState(null);
  const [aktivitas, setAktivitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDashboardPemilik().then(r => setStats(r.data));
    getAktivitas().then(r => setAktivitas(r.data));
  }, []);

  if (!stats) return <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>;

  return (
    <div>
      <div className="stats">
        <StatCard label="Total Kamar" value={stats.total_kamar} icon={<svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.grid}/></svg>} delta={`Terisi: ${stats.kamar_terisi} · Kosong: ${stats.kamar_kosong}`} onClick={() => navigate(ROUTES.PEMILIK.KAMAR)} />
        <StatCard label="Penyewaan Baru" value={stats.penyewaan_baru} icon={<svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.receipt}/></svg>} delta="Menunggu konfirmasi" onClick={() => navigate(ROUTES.PEMILIK.PENYEWAAN)} />
        <StatCard label="Tagihan Belum Lunas" value={stats.tagihan_belum_lunas} icon={<svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.card}/></svg>} delta={`Total ${formatCurrency(stats.total_tagihan_belum_lunas)}`} onClick={() => navigate(ROUTES.PEMILIK.TAGIHAN)} />
        <StatCard label="Pembayaran Menunggu" value={stats.pembayaran_menunggu} icon={<svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.check}/></svg>} delta="Menunggu verifikasi" onClick={() => navigate(ROUTES.PEMILIK.PEMBAYARAN)} />
      </div>

      <div className="quick-grid">
        {[
          { icon: d.receipt, label: 'Konfirmasi Sewa', desc: `${stats.penyewaan_baru} permintaan baru`, to: ROUTES.PEMILIK.PENYEWAAN, color: 'var(--pine)' },
          { icon: d.check, label: 'Verifikasi Pembayaran', desc: `${stats.pembayaran_menunggu} menunggu`, to: ROUTES.PEMILIK.PEMBAYARAN, color: 'var(--pine)' },
          { icon: d.alert, label: 'Keluhan Baru', desc: '1 perlu ditindaklanjuti', to: ROUTES.PEMILIK.KELUHAN, color: 'var(--pine)' },
        ].map((item, i) => (
          <div key={i} className="quick-card" onClick={() => navigate(item.to)}>
            <div className="qc-left">
              <div className="qc-icon"><svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d={item.icon}/></svg></div>
              <div><h4>{item.label}</h4><p>{item.desc}</p></div>
            </div>
            <span className="arrow"><svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d={d.arrow}/></svg></span>
          </div>
        ))}
      </div>

      <h3 className="recent-title">Aktivitas Terbaru</h3>
      <div className="recent-list">
        {aktivitas.map(a => (
          <div key={a.id} className="recent-item">
            <div className="ri-left">
              <svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d={a.tipe === 'penyewaan' ? d.receipt : a.tipe === 'pembayaran' ? d.check : a.tipe === 'keluhan' ? d.alert : d.card}/></svg>
              <span dangerouslySetInnerHTML={{ __html: a.deskripsi }} />
              <span className="ri-detail">{a.waktu}</span>
            </div>
            <Badge status={a.status === 'Menunggu' || a.status === 'Menunggu Verifikasi' || a.status === 'Baru' ? 'menunggu' : 'lunas'}>{a.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
