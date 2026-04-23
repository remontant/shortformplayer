'use client';

interface Props {
  value: number;
  total: number;
  thick?: boolean;
}

export default function ProgressBar({ value, total, thick = false }: Props) {
  const pct = Math.max(0, Math.min(100, (value / total) * 100));
  return (
    <div className={`w-full bg-[var(--ink-20)] rounded-full overflow-hidden ${thick ? 'h-[6px]' : 'h-[3px]'}`}>
      <div
        className="h-full bg-[#E63946] rounded-full transition-[width] duration-200 ease-linear"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}