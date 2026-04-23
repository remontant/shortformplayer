'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FeedEntry, getSeries } from '@/lib/data';

interface Props {
  entry: FeedEntry;
  onBackToList: () => void;
}

export default function ComingSoon({ entry, onBackToList }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const s = getSeries(entry.seriesId)!;
  const releasedCount = s.episodes.length;

  const touchStartY = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartY.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.clientY - touchStartY.current;

    if (deltaY < -40) {
      // Swipe Up
      setIsFull(true);
    } else if (deltaY > 40) {
      // Swipe Down
      if (isFull) {
        setIsFull(false);
      } else {
        onBackToList(); // 반 창일 때 아래로 내리면 모달 닫기 (이전 화면으로)
      }
    }
  };

  const alertModal = showModal && (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowModal(false);
      }}
      className="fixed inset-0 z-[9999] bg-[rgba(0,0,0,0.7)] flex items-center justify-center p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--paper-2)] p-[24px_32px] rounded-[16px] text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[var(--ink-10)] max-w-[300px] w-full"
      >
        <h3 className="m-0 mb-3 text-[18px] text-[var(--ink)] font-semibold">Coming Soon</h3>
        <p className="m-0 mb-5 text-[14px] text-[var(--ink-60)] leading-[1.5]">
          해당 기능은 현재 준비 중입니다.<br />조금만 기다려주세요!
        </p>
        <button
          onClick={() => setShowModal(false)}
          className="w-full p-[12px] rounded-full bg-[var(--plot-red)] text-[#FFFFFF] border-none font-semibold cursor-pointer hover:bg-[var(--plot-red-hover)] transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end pointer-events-none">
      {/* Dim Background */}
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-[2px] pointer-events-auto"
        onClick={onBackToList}
      />

      <style jsx>{`
        @keyframes slideUpModal {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Bottom Sheet */}
      <div
        className="relative bg-[var(--paper)] w-full rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden"
        style={{
          height: isFull ? '100dvh' : '65dvh',
          animation: 'slideUpModal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      >
        {/* Background Blur Image for Full mode (Optional, looks nice) */}
        {isFull && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30 transition-opacity duration-500">
            <Image
              src={s.poster}
              alt=""
              fill
              className="object-cover scale-[1.15] blur-[40px]"
              unoptimized
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--paper-60)_0%,var(--paper)_100%)]" />
          </div>
        )}

        {/* Drag Handle */}
        <div
          className="relative z-10 w-full pt-4 pb-4 flex justify-center shrink-0 cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="w-10 h-1.5 rounded-full bg-[var(--ink-20)]" />
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-10 hide-scrollbar flex flex-col items-center text-center">
          
          {/* Poster thumb */}
          <div
            className={`mx-auto mb-7 rounded-[14px] overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_1px_var(--ink-10)] transition-all duration-400 ${
              isFull ? 'w-[140px] h-[186px]' : 'w-[110px] h-[146px]'
            }`}
          >
            <Image src={s.poster} alt={s.title} fill className="object-cover" unoptimized />
          </div>

          <h2 className="text-2xl font-bold tracking-[-0.02em] leading-[1.3] m-0 mb-4 text-[var(--ink)]">
            드디어 밝혀지는<br />
            진짜 이야기
          </h2>

          <p className="text-[14px] leading-[1.55] text-[var(--ink-60)] m-0 mb-8">
            더 파격적이고 더 아찔한 다음 편,<br />
            지금 바로 확인해 보세요.
          </p>

          {/* Progress bar */}
          <div className="flex items-center gap-2.5 mb-7 w-full">
            <div className="flex-1 h-1 rounded-full bg-[var(--ink-10)] overflow-hidden">
              <div
                className="h-full bg-[#E63946] rounded-full transition-all duration-1000"
                style={{ width: `${(releasedCount / s.totalEp) * 100}%` }}
              />
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-80)] tracking-[0.06em] tabular-nums">
              {releasedCount}/{s.totalEp}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full mb-6 mt-auto">
            {/* Episode purchase button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="flex-1 p-[14px_8px] rounded-[16px] bg-[var(--paper-20)] text-[var(--ink)] border border-[var(--ink-20)] text-[15px] font-semibold tracking-[-0.01em] cursor-pointer flex flex-col items-center justify-center gap-1 transition-all duration-150 ease-in-out hover:bg-[var(--paper-40)] active:scale-[0.97]"
            >
              <span className="text-[12px] text-[var(--ink-60)] font-medium">다음 화 보기</span>
              <span className="flex items-center gap-1 text-[#F5C518] text-[16px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#F5C518" />
                  <circle cx="12" cy="12" r="7" fill="#E5A900" />
                  <path d="M12 16.5C9.5 16.5 7.5 14.5 7.5 12C7.5 9.5 9.5 7.5 12 7.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </svg>
                800
              </span>
            </button>

            {/* Full series purchase button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="flex-1 p-[14px_8px] rounded-[16px] bg-[linear-gradient(135deg,#E50914_0%,#B00710_100%)] text-[#FFFFFF] border-none text-[15px] font-bold tracking-[-0.01em] cursor-pointer shadow-[0_4px_14px_rgba(229,9,20,0.4)] transition-all duration-150 ease-in-out animate-[btnGlow_2s_infinite] flex flex-col items-center justify-center gap-1 hover:brightness-110 active:scale-[0.96]"
            >
              <span className="text-[12px] opacity-90 font-medium">전체 관람 (할인)</span>
              <div className="flex items-center gap-1.5">
                <span className="line-through opacity-60 text-[11px] font-medium">12,500</span>
                <span className="flex items-center gap-1 text-[#FFD700] text-[16px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#FFD700" />
                    <circle cx="12" cy="12" r="7" fill="#FDB813" />
                    <path d="M12 16.5C9.5 16.5 7.5 14.5 7.5 12C7.5 9.5 9.5 7.5 12 7.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  11,500
                </span>
              </div>
            </button>
          </div>

          {/* Back to list button detached */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBackToList();
            }}
            className="w-full p-[14px] rounded-full bg-transparent text-[var(--ink-40)] border-none text-[13px] font-medium cursor-pointer underline underline-offset-4 transition-colors duration-150 hover:text-[var(--ink-60)] mb-4"
          >
            아니요, 다른 드라마 볼게요
          </button>
        </div>
      </div>

      {alertModal}
    </div>
  );
}
