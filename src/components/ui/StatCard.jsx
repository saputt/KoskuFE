export default function StatCard({ label, value, delta, icon, onClick }) {
  return (
    <div className="stat-card" onClick={onClick}>
      <span className="label">{label}</span>
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="value">{value}</div>
      {delta && <div className="delta">{delta}</div>}
    </div>
  );
}
