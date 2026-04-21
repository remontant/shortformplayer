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
      <div
        style={{
          position: 'absolute',
          inset: '0 0 auto 0',
          height: '28%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)',
          pointerEvents: 'none',
        }}
      />
      {/* Bottom protection gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 'auto 0 0 0',
          height: '38%',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2) 60%, transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '22px 20px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            data-noprop="true"
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            aria-label="목록으로"
            style={{
              width: 38,
              height: 38,
              borderRadius: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--paper-40)',
              border: '1px solid var(--ink-10)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: 'var(--ink)',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.02em',
              color: 'var(--ink)',
              lineHeight: 1,
            }}
          >
            Drama<span style={{ color: 'var(--plot-red)' }}>Pann</span>
          </div>
        </div>
        <EpisodeBadge season={series.season} ep={ep} />
      </div>

      {/* Bottom meta */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 18px 20px',
          zIndex: 2,
          color: 'var(--ink)',
        }}
      >
        <button
          data-noprop="true"
          onClick={(e) => {
            e.stopPropagation();
            onOpenSeries();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textAlign: 'left',
            color: 'var(--ink)',
            fontFamily: 'var(--font-sans)',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '-0.015em',
            marginBottom: 4,
            display: 'block',
          }}
        >
          {series.title}
        </button>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--ink-60)',
            marginBottom: 12,
          }}
        >
          EP{String(ep).padStart(2, '0')} · {epTitle}
        </div>
        <ProgressBar value={progress} total={duration} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-60)',
            marginTop: 6,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <span>{fmtTime(progress)}</span>
          <span>{fmtTime(duration)}</span>
        </div>
      </div>
    </>
  );
}
