import { useState, useEffect } from 'react';
import Badge from '../../components/ui/Badge';
import { getKeluhanList, createKeluhan } from '../../features/keluhan/api';
import { getKamarList } from '../../features/kamar/api';
import useAuthStore from '../../stores/authStore';
import { formatDate } from '../../utils/formatter';

export default function PenghuniKeluhan() {
  const [tab, setTab] = useState('ajukan');
  const [data, setData] = useState([]);
  const [kamarList, setKamarList] = useState([]);
  const [idKamar, setIdKamar] = useState('');
  const [isi, setIsi] = useState('');
  const user = useAuthStore(s => s.user);

  const loadRiwayat = () => getKeluhanList({ id_user: user.id_user, sort: 'terbaru' }).then(r => setData(r.data));

  useEffect(() => {
    loadRiwayat();
    getKamarList({}).then(r => setKamarList(r.data));
  }, []);

  const handleSubmit = async () => {
    if (!idKamar || !isi) return;
    await createKeluhan({ id_kamar: idKamar, isi_keluhan: isi });
    setIdKamar(''); setIsi(''); loadRiwayat(); setTab('riwayat');
  };

  return (
    <div style={{ maxWidth: '820px' }}>
      <div className="tabs" style={{ marginBottom: '28px' }}>
        {['ajukan', 'riwayat'].map(t => (
          <button key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'ajukan' ? 'Ajukan Keluhan' : 'Riwayat Keluhan'}
          </button>
        ))}
      </div>

      {tab === 'ajukan' ? (
        <>
          <div className="field">
            <label>Kamar Terkait <span className="req">*</span></label>
            <div className="input-wrap">
              <select value={idKamar} onChange={e => setIdKamar(e.target.value)}>
                <option value="">Pilih kamar</option>
                {kamarList.map(k => <option key={k.id_kamar} value={k.id_kamar}>Kamar {k.no_kamar}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Isi Keluhan <span className="req">*</span></label>
            <div className="input-wrap">
              <textarea value={isi} onChange={e => setIsi(e.target.value)} placeholder="Jelaskan masalah yang Anda alami..." required />
            </div>
          </div>
          <button className="btn btn-solid" onClick={handleSubmit}><svg className="icon" width="16" height="16" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Kirim Keluhan</button>
        </>
      ) : (
        <table className="data-table">
          <thead><tr><th>Tanggal</th><th>Kamar</th><th>Keluhan</th><th>Status</th></tr></thead>
          <tbody>
            {data.map(k => (
              <tr key={k.id_keluhan}>
                <td>{formatDate(k.tanggal_keluhan)}</td>
                <td>{k.no_kamar}</td>
                <td>
                  {k.isi_keluhan}
                  {k.tanggapan && <div className="tanggapan">Tanggapan: {k.tanggapan}</div>}
                </td>
                <td><Badge status={k.status}>{k.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
