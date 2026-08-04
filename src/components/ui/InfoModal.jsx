import Modal from './Modal';

export default function InfoModal({
  open,
  title,
  description,
  type = 'info',
  onClose,
  confirmLabel = 'Tutup',
  children,
}) {
  return (
    <Modal open={open} onClose={onClose} type={type} title={title} subtitle={description}>
      {children}
      <div className="btn-group">
        <button type="button" className="btn btn-solid" onClick={onClose}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
