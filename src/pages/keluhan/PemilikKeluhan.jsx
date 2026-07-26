import { useState, useEffect } from 'react';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Table, { Td } from '../../components/ui/Table';
import { getKeluhanList, tanggapiKeluhan } from '../../features/keluhan/api';
import { formatDate } from '../../utils/formatter';

export default function PemilikKeluhan() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(null);
  const [tanggapan, setTanggapan] = useState('');
  const [statusBaru, setStatusBaru] = useState('diproses');

  const load = () => getKeluhanList({ status: filter || undefined, sort: 'terbaru' }).then(r => setData(r.data));
  useEffect(() => { load(); }, [filter]);

  const handleKirim = async () => {
    await tanggapiKeluhan(showModal.id_keluhan, { tanggapan, status: statusBaru });
    setShowModal(null); setTanggapan(''); load();
  };

  return (
    <div>
      <div className="filter-bar">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">Semua Status</option>
          <option value="baru">Baru</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
        </select>
        <select><option value="">Urutkan</option><option>Terbaru</option><option>Terlama</option></select>
      </div>

      <table className="data-table">
        <thead><tr><th>Tanggal</th><th>Penghuni</th><th>Kamar</th><th>Keluhan</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          {data.map(k => (
            <tr key={k.id_keluhan}>
              <td>{formatDate(k.tanggal_keluhan)}</td>
              <td><strong>{k.nama_penghuni}</strong></td>
              <td>{k.no_kamar}</td>
              <td>
                <div className="keluhan-ringkas">{k.isi_keluhan}</div>
                {k.tanggapan && <div className="tanggapan">Tanggapan: {k.tanggapan}</div>}
              </td>
              <td><Badge status={k.status}>{k.status}</Badge></td>
              <td className="actions">
                {k.status !== 'selesai' ? (
                  <button className="btn btn-sm-success" onClick={() => setShowModal(k)}><svg className="icon" width="13" height="13" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Tanggapi</button>
                ) : <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={!!showModal} onClose={() => setShowModal(null)} title="Tanggapi Keluhan" subtitle="Berikan tanggapan dan perbarui status keluhan.">
        {showModal && <>
          <div className="detail-box">
            <div className="row"><span className="label">Penghuni</span><span>{showModal.nama_penghuni}</span></div>
            <div className="row"><span className="label">Kamar</span><span>{showModal.no_kamar}</span></div>
            <div className="row"><span className="label">Tanggal</span><span>{formatDate(showModal.tanggal_keluhan)}</span></div>
            <div className="row" style={{ borderTop: '1px solid var(--line)', paddingTop: '8px', marginTop: '4px' }}><span className="label">Isi Keluhan</span><span style={{ textAlign: 'right', maxWidth: '60%' }}>{showModal.isi_keluhan}</span></div>
          </div>
          <div className="field">
            <label>Tanggapan <span className="req">*</span></label>
            <textarea value={tanggapan} onChange={e => setTanggapan(e.target.value)} placeholder="Tulis tanggapan Anda..." required />
          </div>
          <div className="field">
            <label>Perbarui Status</label>
            <select value={statusBaru} onChange={e => setStatusBaru(e.target.value)}>
              <option value="baru">Baru</option>
              <option value="diproses">Diproses</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
          <div className="btn-group">
            <button className="btn btn-sm-line" onClick={() => setShowModal(null)}>Batal</button>
            <button className="btn btn-sm-success" onClick={handleKirim}>Kirim Tanggapan</button>
          </div>
        </>}
      </Modal>
    </div>
  );
}
