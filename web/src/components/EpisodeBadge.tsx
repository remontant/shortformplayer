'use client';

interface Props {
  ep: number;
  totalEp: number;
  time?: string;
}

export default function EpisodeBadge({ ep, totalEp, time }: Props) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--paper-40)] backdrop-blur-[12px] text-[var(--ink)] font-[family-name:var(--font-mono)] text-[12px] tracking-[0.02em] border border-[var(--ink-10)]">
      <span className="tabular-nums">
        {String(ep).padStart(2, '0')} <span className="opacity-40 mx-[2px]">/</span> {String(totalEp).padStart(2, '0')}
      </span>
      {time && (
        <>
          <span className="opacity-40">·</span>
          <span>{time}</span>
        </>
      )}
    </div>
  );
}