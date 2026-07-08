export default function Folio({
  number,
  className = "",
}: {
  number: string;
  className?: string;
}) {
  return (
    <span
      className={`font-ticket text-xs uppercase tracking-widest text-ink/40 ${className}`}
    >
      Folio N.º {number}
    </span>
  );
}
