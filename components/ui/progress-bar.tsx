export function ProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={`h-1.5 rounded-full bg-fill overflow-hidden ${className ?? ""}`}
    >
      <div
        className="h-full rounded-full bg-accent"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
