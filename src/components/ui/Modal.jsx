import { useEffect } from 'react';

const TYPE_ICONS = {
  success: <path d="M5 12l5 5L19 7" />,
  error: <><path d="M18 6 6 18" /><path d="M6 6l12 12" /></>,
  warning: <><path d="M12 4v10" /><path d="M12 17.5h.01" /></>,
  info: <><path d="M12 8v8" /><path d="M12 4h.01" /></>,
  confirm: <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />,
};

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  description,
  type = 'default',
  size,
  icon,
  footer,
  children,
  closeOnOverlay = true,
  showClose = true,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const sub = description ?? subtitle;
  const sizeCls = size === 'sm' ? ' modal-sm' : size === 'lg' ? ' modal-lg' : '';
  const hasTypeIcon = type !== 'default';

  return (
    <div className={`modal-overlay active`} onClick={closeOnOverlay ? onClose : undefined}>
      <div className={`modal${sizeCls}`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {showClose && (
          <button type="button" className="modal-close" onClick={onClose} aria-label="Tutup">
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        )}

        {hasTypeIcon ? (
          <div className="modal-head">
            <div className={`modal-icon ${type}`}>
              {icon || (
                <svg className="icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{TYPE_ICONS[type]}</svg>
              )}
            </div>
            <div>
              {title && <h2>{title}</h2>}
              {sub && <p className="sub">{sub}</p>}
            </div>
          </div>
        ) : (
          <>
            {title && <h2>{title}</h2>}
            {sub && <p className="sub">{sub}</p>}
          </>
        )}

        {children}
        {footer && <div className="btn-group">{footer}</div>}
      </div>
    </div>
  );
}
