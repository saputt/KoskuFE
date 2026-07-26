export default function Modal({ open, onClose, title, subtitle, children }) {
  return (
    <div className={`modal-overlay${open ? ' active' : ''}`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        {subtitle && <p className="sub">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
