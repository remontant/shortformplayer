'use client';

import Image from 'next/image';
import { ChevronLeft } from '@/components/Icons';
import { getSeries, fmtTime } from '@/lib/data';

interface Props {
  seriesId: string;
  onBack: () => void;
  onWatch: () => void;
}

export default function SeriesDetail({ seriesId, onBack, onWatch }: Props) {
  const s = getSeries(seriesId);
  if (!s) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        background: 'var(--paper)',
      }}
    >
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '9/12' }}>
        <Image
          src={s.poster}
          alt={s.title}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        {/* Fade to paper */}
        <div
          style={{
            position: 'absolute',
            inset: 'auto 0 0 0',
            height: '60%',
            background:
              'linear-gradient(to top, var(--paper) 8%, rgba(250,247,242,0) 90%)',
          }}
        />
        {/* Back button */}
        <button
          onClick={onBack}
          aria-label="뒤로"
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 2,
            width: 36,
            height: 36,
            borderRadius: 9999,
            background: 'rgba(15,14,13,0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(250,247,242,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF7F2',
          }}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Meta block */}
      <div
        style={{
          padding: '0 20px 32px',
          marginTop: -90,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Genre pill */}
        <div
          style={{
            display: 'inline-flex',
            padding: '4px 10px',
            borderRadius: 9999,
            background: 'var(--plot-red)',
            color: '#FAF7F2',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 500,
            marginBottom: 12,
          }}
        >
          {s.genre}
        </div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            margin: '0 0 8px',
            color: 'var(--ink)',
          }}
        >
          {s.title}
        </h1>
        <p
          style={{
            color: 'var(--fg-2)',
            fontSize: 15,
            margin: '0 0 16px',
            lineHeight: 1.5,
          }}
        >
          {s.tagline}
        </p>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--fg-3)',
            marginBottom: 24,
          }}
        >
          S{s.season} · {s.totalEp} EP · 평균 1:40
        </div>

        {/* Primary CTA */}
        <button
          onClick={onWatch}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--r-md)',
            background: 'var(--plot-red)',
            color: '#FAF7F2',
            border: 'none',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 12,
            transition: 'background 150ms',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              'var(--plot-red-hover)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              'var(--plot-red)')
          }
        >
          다음 편 보기 · EP{String(s.episodes[0].ep).padStart(2, '0')}
        </button>

        {/* Secondary CTA */}
        <button
          onClick={onWatch}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--r-md)',
            background: 'transparent',
            color: 'var(--ink)',
            border: '1px solid var(--ink-10)',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          처음부터 보기
        </button>

        {/* Episode list */}
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              fontSize: 11,
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 500,
              marginBottom: 12,
            }}
          >
            에피소드
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: s.totalEp }, (_, i) => {
              const epNum = s.totalEp - i;
              const real = s.episodes.find((e) => e.ep === epNum);
              const title = real?.title ?? '공개 예정';
              const locked = !real;
              return (
                <div
                  key={epNum}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 0',
                    borderBottom: '1px solid var(--ink-10)',
                    opacity: locked ? 0.4 : 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                      color: 'var(--fg-2)',
                      width: 36,
                      fontWeight: 500,
                    }}
                  >
                    EP{String(epNum).padStart(2, '0')}
                  </div>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>
                    {title}
                  </div>
                  {real && (
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--fg-3)',
                      }}
                    >
                      {fmtTime(real.duration)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
