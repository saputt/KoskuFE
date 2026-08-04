import Modal from './Modal';

export default function ConfirmModal({
  open,
  title = 'Konfirmasi',
  description,
  onCancel,
  onConfirm,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  danger = false,
  loading = false,
  children,
}) {
  return (
    <Modal open={open} onClose={onCancel} type="confirm" title={title} subtitle={description}>
      {children}
      <div className="btn-group">
        <button type="button" className="btn btn-line" onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </button>
        <button
          type="button"
          className={danger ? 'btn btn-danger' : 'btn btn-solid'}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Memproses...' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
