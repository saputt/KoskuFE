export default function Button({ children, variant = 'solid', size = 'md', icon, className = '', ...props }) {
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`;
  return (
    <button className={cls} {...props}>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  );
}
