export default function Select({ label, required, options, placeholder, className = '', ...props }) {
  return (
    <div className="field">
      {label && <label>{label}{required && <span className="req">*</span>}</label>}
      <select {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
