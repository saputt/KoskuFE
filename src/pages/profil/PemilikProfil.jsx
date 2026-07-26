import useAuthStore from '../../stores/authStore';

export default function PemilikProfil() {
  const user = useAuthStore(s => s.user);

  return (
    <div style={{ maxWidth: '720px' }}>
      <div className="form-card">
        <h2>Data Diri</h2>
        <p className="sub">Informasi akun Anda.</p>
        <div className="field"><label>Nama Lengkap</label><div className="input-wrap"><input value={user?.nama || ''} disabled /></div></div>
        <div className="field"><label>Email</label><div className="input-wrap"><input value={user?.email || ''} disabled /></div></div>
        <div className="field"><label>Nomor HP</label><div className="input-wrap"><input value={user?.no_hp || ''} disabled /></div></div>
        <div className="field"><label>Role</label><div className="input-wrap"><input value={user?.role === 'pemilik' ? 'Pemilik' : 'Penghuni'} disabled /></div></div>
      </div>
    </div>
  );
}
