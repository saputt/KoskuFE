import { useCallback, useEffect, useState } from 'react';

const TYPE_ICONS = {
  success: <path d="M5 12l5 5L19 7" />,
  error: <><path d="M18 6 6 18" /><path d="M6 6l12 12" /></>,
  warning: <><path d="M12 4v10" /><path d="M12 17.5h.01" /></>,
  info: <><path d="M12 8v8" /><path d="M12 4h.01" /></>,
};

export default function Toast({ type = 'info', message, onClose, duration = 3500 }) {
  const [leaving, setLeaving] = useState(false);

  const close = useCallback(() => {
    setLeaving(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(close, duration);
    return () => clearTimeout(timer);
  }, [close, duration]);

  return (
    <div className={`toast ${type}${leaving ? ' leaving' : ''}`} role="alert">
      <span className="toast-icon">
        <svg className="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {TYPE_ICONS[type] || TYPE_ICONS.info}
        </svg>
      </span>
      <span className="toast-msg">{message}</span>
      <button type="button" className="toast-close" onClick={close} aria-label="Tutup">
        <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
    </div>
  );
}
