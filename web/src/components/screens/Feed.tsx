'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { getFeedFor } from '@/lib/data';
import Player from '@/components/player/Player';
import ComingSoon from './ComingSoon';

interface Props {
  seriesId: string;
  initialEp?: number | null;
  onBack: () => void;
  onOpenSeries: (id: string) => void;
}

export default function Feed({ seriesId, initialEp, onBack, onOpenSeries }: Props) {
  const feed = useMemo(() => getFeedFor(seriesId), [seriesId]);
  
  // 재생 가능한 에피소드와 ComingSoon 정보 분리
  const playableFeed = useMemo(() => feed.filter(e => !e.comingSoon), [feed]);
  const comingSoonEntry = useMemo(() => feed.find(e => e.comingSoon), [feed]);

  const [idx, setIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const touchDelta = useRef<number>(0);
  const lastWheelTime = useRef<number>(0);

  useEffect(() => {
    if (initialEp != null) {
      const targetIdx = playableFeed.findIndex((e) => e.ep === initialEp);
      setIdx(targetIdx >= 0 ? targetIdx : 0);
    } else {
      setIdx(0);
    }
    setShowComingSoon(false);
  }, [seriesId, initialEp, playableFeed]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)';
      containerRef.current.style.transform = `translateY(-${idx * 100}%)`;
    }
  }, [idx]);

  const onPointerDown = (e: React.PointerEvent) => {
    // 모달이 열려있으면 배경 스와이프 무시
    if (showComingSoon) return;

    touchStartY.current = e.clientY;
    touchDelta.current = 0;
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    // 마우스 버튼이 눌려있지 않으면(1) 무시 (터치는 항상 눌린 상태)
    if (touchStartY.current === null || showComingSoon) return;
    if (e.pointerType === 'mouse' && e.buttons !== 1) return;

    const currentY = e.clientY;
    let delta = currentY - touchStartY.current;
    
    // 첫번째에서 내리거나 마지막에서 올릴 때 탄성(저항) 효과
    if (idx === 0 && delta > 0) {
      delta *= 0.3;
    } else if (idx === playableFeed.length - 1 && delta < 0) {
      delta *= 0.3;
    }
    
    touchDelta.current = delta;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(calc(-${idx * 100}% + ${delta}px))`;
    }
  };

  const onPointerUp = () => {
    if (touchStartY.current === null || showComingSoon) return;
    
    const delta = touchDelta.current;
    const isUpSwipe = delta < -50;
    const isDownSwipe = delta > 50;

    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)';
    }

    if (isUpSwipe) {
      if (idx < playableFeed.length - 1) {
        setIdx((prev) => prev + 1);
      } else if (idx === playableFeed.length - 1 && comingSoonEntry) {
        // 마지막 에피소드에서 올리면 모달 띄우고 위치는 원복
        setShowComingSoon(true);
        if (containerRef.current) {
          containerRef.current.style.transform = `translateY(-${idx * 100}%)`;
        }
      } else {
        if (containerRef.current) {
          containerRef.current.style.transform = `translateY(-${idx * 100}%)`;
        }
      }
    } else if (isDownSwipe && idx > 0) {
      setIdx((prev) => prev - 1);
    } else {
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(-${idx * 100}%)`;
      }
    }
    
    touchStartY.current = null;
    touchDelta.current = 0;
  };

  const onWheel = (e: React.WheelEvent) => {
    if (showComingSoon) return;

    const now = Date.now();
    if (now - lastWheelTime.current < 800) return;
    
    if (e.deltaY > 30) {
      if (idx < playableFeed.length - 1) {
        setIdx((prev) => prev + 1);
        lastWheelTime.current = now;
      } else if (idx === playableFeed.length - 1 && comingSoonEntry) {
        setShowComingSoon(true);
        lastWheelTime.current = now;
      }
    } else if (e.deltaY < -30 && idx > 0) {
      setIdx((prev) => prev - 1);
      lastWheelTime.current = now;
    }
  };

  if (!playableFeed.length) return null;

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      className="absolute inset-0 overflow-hidden bg-[var(--paper)] touch-none"
    >
      {/* Episodes Container */}
      <div
        ref={containerRef}
        className="flex flex-col h-full w-full"
        style={{
          transform: `translateY(-${idx * 100}%)`,
          transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {playableFeed.map((entry, i) => {
          const isNear = Math.abs(i - idx) <= 1;

          return (
            <div
              key={entry.id}
              className="flex-[0_0_100%] w-full h-full relative"
            >
              {isNear && (
                <Player
                  entry={entry}
                  active={i === idx && !showComingSoon} // 모달 떠있을 땐 비활성화(재생정지 등) 가능. 원하면 남겨둬도 됨
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted((p) => !p)}
                  onBack={onBack}
                  onOpenSeries={onOpenSeries}
                  onEnded={() => {
                    if (idx < playableFeed.length - 1) {
                      setIdx((prev) => prev + 1);
                    } else if (idx === playableFeed.length - 1 && comingSoonEntry) {
                      setShowComingSoon(true);
                    }
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Swipe hint on first episode */}
      {idx === 0 && playableFeed.length > 1 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[5] pointer-events-none text-[var(--ink-60)] text-[11px] font-[family-name:var(--font-mono)] tracking-[0.06em] animate-[dpHint_2400ms_ease-in-out_infinite]">
          ↑ 다음 에피소드
        </div>
      )}

      {/* Coming Soon Modal */}
      {showComingSoon && comingSoonEntry && (
        <ComingSoon 
          entry={comingSoonEntry} 
          onBackToList={() => setShowComingSoon(false)} 
        />
      )}
    </div>
  );
}
