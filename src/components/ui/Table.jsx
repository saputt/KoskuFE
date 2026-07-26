export default function Table({ headers, children }) {
  return (
    <table className="data-table">
      <thead>
        <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function Td({ children, className = '' }) {
  return <td className={className}>{children}</td>;
}
