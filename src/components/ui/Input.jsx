export default function Input({ label, required, error, className = '', ...props }) {
  return (
    <div className="field">
      {label && <label>{label}{required && <span className="req">*</span>}</label>}
      <div className="input-wrap">
        <input className={error ? 'input-error' : ''} {...props} />
      </div>
      {error && <p className="hint" style={{ color: 'var(--stamp)' }}>{error}</p>}
    </div>
  );
}
