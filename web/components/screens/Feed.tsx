'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { getFeedFor } from '@/lib/data';
import Player from '@/components/player/Player';
import ComingSoon from './ComingSoon';

interface Props {
  seriesId: string;
  onBack: () => void;
  onOpenSeries: (id: string) => void;
}

export default function Feed({ seriesId, onBack, onOpenSeries }: Props) {
  const feed = useMemo(() => getFeedFor(seriesId), [seriesId]);
  const [idx, setIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Use refs instead of state for swipe delta to prevent expensive re-renders on every pixel move
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const touchDelta = useRef<number>(0);
  const lastWheelTime = useRef<number>(0);

  // Reset to EP1 when series changes
  useEffect(() => {
    setIdx(0);
  }, [seriesId]);

  // Sync the container position when idx changes (from wheel or auto-play next)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)';
      containerRef.current.style.transform = `translateY(-${idx * 100}%)`;
    }
  }, [idx]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
    touchDelta.current = 0;
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.targetTouches[0].clientY;
    let delta = currentY - touchStartY.current;
    
    // Prevent swiping past the ends with resistance
    if (idx === 0 && delta > 0) {
      delta *= 0.3;
    } else if (idx === feed.length - 1 && delta < 0) {
      delta *= 0.3;
    }
    
    touchDelta.current = delta;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(calc(-${idx * 100}% + ${delta}px))`;
    }
  };

  const onTouchEnd = () => {
    if (touchStartY.current === null) return;
    
    const delta = touchDelta.current;
    const isUpSwipe = delta < -50; // swiped up (move down the list)
    const isDownSwipe = delta > 50; // swiped down (move up the list)

    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)';
    }

    if (isUpSwipe && idx < feed.length - 1) {
      setIdx((prev) => prev + 1);
    } else if (isDownSwipe && idx > 0) {
      setIdx((prev) => prev - 1);
    } else {
      // Revert if swipe was not long enough
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(-${idx * 100}%)`;
      }
    }
    
    touchStartY.current = null;
    touchDelta.current = 0;
  };

  const onWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 800) return; // debounce
    
    if (e.deltaY > 30 && idx < feed.length - 1) {
      setIdx((prev) => prev + 1);
      lastWheelTime.current = now;
    } else if (e.deltaY < -30 && idx > 0) {
      setIdx((prev) => prev - 1);
      lastWheelTime.current = now;
    }
  };

  if (!feed.length) return null;

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: '#0F0E0D',
      }}
    >
      <div
        ref={containerRef}
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(-${idx * 100}%)`,
          transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {feed.map((entry, i) => {
          // Render only current, previous, and next for performance
          const isNear = Math.abs(i - idx) <= 1;

          return (
            <div
              key={entry.id}
              style={{
                flex: '0 0 100%',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              {isNear && (
                entry.comingSoon ? (
                  <ComingSoon entry={entry} onBackToList={onBack} />
                ) : (
                  <Player
                    entry={entry}
                    active={i === idx}
                    isMuted={isMuted}
                    onToggleMute={() => setIsMuted((p) => !p)}
                    onBack={onBack}
                    onOpenSeries={onOpenSeries}
                    onEnded={() => {
                      if (idx < feed.length - 1) {
                        setIdx((prev) => prev + 1);
                      }
                    }}
                  />
                )
              )}
            </div>
          );
        })}
      </div>

      {/* Swipe hint on first episode */}
      {idx === 0 && feed.length > 1 && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            zIndex: 5,
            pointerEvents: 'none',
            color: 'rgba(250,247,242,0.55)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em',
            animation: 'dpHint 2400ms ease-in-out infinite',
          }}
        >
          ↑ 다음 에피소드
        </div>
      )}
    </div>
  );
}