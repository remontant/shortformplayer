'use client';

import { ChevronLeft } from '@/components/Icons';
import EpisodeBadge from '@/components/EpisodeBadge';
import ProgressBar from '@/components/ProgressBar';
import { Series, fmtTime } from '@/lib/data';

interface Props {
  series: Series;
  ep: number;
  epTitle: string;
  progress: number;
  duration: number;
  onBack: () => void;
  onOpenSeries: () => void;
}

export default function PlayerChrome({
  series,
  ep,
  epTitle,
  progress,
  duration,
  onBack,
  onOpenSeries,
}: Props) {
  return (
    <>
      {/* Top protection gradient */}
      <div className="absolute inset-[0_0_auto_0] h-[28%] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.75),transparent)] pointer-events-none" />
      {/* Bottom protection gradient */}
      <div className="absolute inset-[auto_0_0_0] h-[38%] bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.2)_60%,transparent)] pointer-events-none" />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 pt-[22px] px-5 pb-5 flex justify-between items-center z-[2]">
        <div className="flex items-center gap-3">
          <button
            data-noprop="true"
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            aria-label="목록으로"
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center bg-[var(--paper-40)] border border-[var(--ink-10)] backdrop-blur-[10px] text-[var(--ink)] cursor-pointer p-0 hover:bg-[var(--paper-60)] transition-colors"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <div className="font-[family-name:var(--font-sans)] text-[18px] font-bold tracking-[0.02em] text-[var(--ink)] leading-none">
            Drama<span className="text-[var(--plot-red)]">Pann</span>
          </div>
        </div>
        <EpisodeBadge ep={ep} totalEp={series.totalEp} />
      </div>

      {/* Bottom meta */}
      <div className="absolute bottom-0 left-0 right-0 px-[18px] pb-5 z-[2] text-[var(--ink)]">
        <button
          data-noprop="true"
          onClick={(e) => {
            e.stopPropagation();
            onOpenSeries();
          }}
          className="bg-transparent border-none p-0 cursor-pointer text-left text-[var(--ink)] font-[family-name:var(--font-sans)] text-[22px] font-semibold tracking-[-0.015em] mb-1 block hover:opacity-80 transition-opacity"
        >
          {series.title}
        </button>
        <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-60)] mb-3">
          EP{String(ep).padStart(2, '0')} · {epTitle}
        </div>
        <ProgressBar value={progress} total={duration} />
        <div className="flex justify-between font-[family-name:var(--font-mono)] text-[10px] text-[var(--ink-60)] mt-1.5 tabular-nums">
          <span>{fmtTime(progress)}</span>
          <span>{fmtTime(duration)}</span>
        </div>
      </div>
    </>
  );
}