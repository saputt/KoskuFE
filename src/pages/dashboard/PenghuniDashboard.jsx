import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { useDashboardPenghuni, useAktivitas } from '../../features/dashboard/hooks/useDashboard';
import { formatCurrency, formatDate, waktuLalu } from '../../utils/formatter';
import { ROUTES } from '../../utils/constants';

const d = {
  grid: 'M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z',
  card: 'M3 6h18v13H3V6zm0 4h18',
  receipt: 'M6 3h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3zM8.5 8h7M8.5 11h7M8.5 14h4',
  alert: 'M4 5h16v11H9l-4 4v-4H4zM12 8v4M12 15.5h.01',
  arrow: 'M5 12h14M13 6l6 6-6 6',
};

export default function PenghuniDashboard() {
  const navigate = useNavigate();

  const { data: dashData, isLoading } = useDashboardPenghuni();
  const { data: aktivitasData } = useAktivitas();

  const stats = dashData?.data;
  const aktivitas = aktivitasData?.data || [];

  if (isLoading || !stats) return <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Memuat...</p>;

  return (
    <div>
      <div className="stats">
        <StatCard label="Kamar Saat Ini" value={stats.kamar_saat_ini ? `Kamar ${stats.kamar_saat_ini}` : '—'} icon={<svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.grid}/></svg>} delta={stats.sejak ? `Aktif · sejak ${formatDate(stats.sejak)}` : 'Tidak ada'} />
        <StatCard label="Tagihan Tertunda" value={stats.tagihan_tertunda} icon={<svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.card}/></svg>} delta={`Total ${formatCurrency(stats.total_tagihan_tertunda)}`} onClick={() => navigate(ROUTES.PENGHUNI.TAGIHAN)} />
        <StatCard label="Penyewaan Aktif" value={stats.penyewaan_aktif} icon={<svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.receipt}/></svg>} delta="Menunggu konfirmasi: 0" onClick={() => navigate(ROUTES.PENGHUNI.PENYEWAAN)} />
        <StatCard label="Keluhan Berjalan" value={stats.keluhan_berjalan} icon={<svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.alert}/></svg>} delta="Perlu ditindaklanjuti" onClick={() => navigate(ROUTES.PENGHUNI.KELUHAN)} />
      </div>

      <div className="quick-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {[
          { icon: d.card, label: 'Bayar Tagihan', desc: `${stats.tagihan_tertunda} tagihan belum lunas`, to: ROUTES.PENGHUNI.TAGIHAN },
          { icon: d.alert, label: 'Ajukan Keluhan', desc: 'Laporkan masalah', to: ROUTES.PENGHUNI.KELUHAN },
        ].map((item, i) => (
          <div key={i} className="quick-card" onClick={() => navigate(item.to)}>
            <div className="qc-left">
              <div className="qc-icon" style={{ width: '40px', height: '40px' }}><svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={item.icon}/></svg></div>
              <div><h4>{item.label}</h4><p>{item.desc}</p></div>
            </div>
            <span className="arrow"><svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d={d.arrow}/></svg></span>
          </div>
        ))}
      </div>

      <h3 className="recent-title">Aktivitas Terbaru</h3>
      <div className="recent-list">
        {aktivitas.map(a => (
          <div key={a.id} className="recent-item">
            <div className="ri-left">
              <svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d={a.tipe === 'keluhan' ? d.alert : d.card}/></svg>
              <span>{a.deskripsi}</span>
              <span className="ri-detail">{waktuLalu(a.waktu)}</span>
            </div>
            <Badge status={a.status === 'Baru' || a.status === 'Menunggu' ? 'menunggu' : a.status === 'Diproses' ? 'diproses' : 'lunas'}>{a.status}</Badge>
          </div>
        ))}
        {aktivitas.length === 0 && <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>Belum ada aktivitas.</p>}
      </div>
    </div>
  );
}
