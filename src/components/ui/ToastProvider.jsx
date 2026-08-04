import { useCallback, useMemo, useState } from 'react';
import { ToastContext } from './ToastContext';
import Toast from './Toast';

let nextId = 1;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((type, message, options = {}) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, type, message, duration: options.duration || 3500 }]);
    return id;
  }, []);

  const api = useMemo(
    () => ({
      success: (msg, opts) => push('success', msg, opts),
      error: (msg, opts) => push('error', msg, opts),
      warning: (msg, opts) => push('warning', msg, opts),
      info: (msg, opts) => push('info', msg, opts),
      dismiss,
    }),
    [push, dismiss],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
