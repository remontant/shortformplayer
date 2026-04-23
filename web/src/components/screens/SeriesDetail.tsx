'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft } from '@/components/Icons';
import { getSeries, fmtTime } from '@/lib/data';

interface Props {
  seriesId: string;
  onBack: () => void;
  onWatch: (epNum: number) => void;
}

export default function SeriesDetail({ seriesId, onBack, onWatch }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const s = getSeries(seriesId);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!s) return null;

  return (
    <div className="bg-[var(--paper)]">
      {/* Hero */}
      <div className="relative w-full aspect-[9/12]">
        <Image
          src={s.poster}
          alt={s.title}
          fill
          className="object-cover"
          unoptimized
        />
        {/* Fade to paper */}
        <div className="absolute inset-[auto_0_0_0] h-[60%] bg-[linear-gradient(to_top,var(--paper)_0%,rgba(250,247,242,0)_100%)]" />
        {/* Back button */}
        <button
          onClick={onBack}
          aria-label="뒤로"
          className="absolute top-4 left-4 z-[2] w-9 h-9 rounded-full bg-[var(--paper-40)] backdrop-blur-[12px] border border-[var(--ink-20)] cursor-pointer flex items-center justify-center text-[var(--ink)] hover:bg-[var(--paper-60)] transition-colors"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Meta block */}
      <div className="px-5 pb-32 -mt-5 relative z-[2] bg-[linear-gradient(to_top,var(--paper)_70%,rgba(250,247,242,0)_100%)] pt-10">
        {s.directorInfo && (
          <div className="text-[var(--ink-80)] text-[13px] font-semibold mb-2 tracking-[-0.01em]">
            {s.directorInfo}
          </div>
        )}

        <h1 className="text-[32px] font-bold tracking-[-0.025em] m-[0_0_10px] text-[var(--ink)]">
          {s.title}
        </h1>

        <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[13px] text-[var(--fg-3)] mb-3 font-medium">
          {s.year && <span>{s.year}</span>}
          {s.year && <span className="opacity-40">·</span>}
          <span>에피소드 {s.totalEp}개</span>
        </div>

        <div className={`flex items-center gap-2 flex-wrap ${s.keywords && s.keywords.length > 0 ? 'mb-3' : 'mb-6'}`}>
          {s.gradeAge && (
            <div className="flex items-center justify-center px-[5px] py-[2px] border border-[var(--ink-40)] rounded-[3px] text-[11px] font-bold text-[var(--ink-80)] font-[family-name:var(--font-mono)]">
              {s.gradeAge}
            </div>
          )}
          {s.gradeTheme && s.gradeTheme.length > 0 && (
            <div className="text-[13px] text-[var(--ink-80)] font-medium">
              {s.gradeTheme.join(', ')}
            </div>
          )}
          {((s.gradeAge || (s.gradeTheme && s.gradeTheme.length > 0)) && s.genre) && (
            <span className="opacity-40 text-[13px]">·</span>
          )}
          {s.genre && (
            <div className="text-[13px] text-[var(--ink-80)] font-medium">
              {s.genre}
            </div>
          )}
        </div>

        {s.keywords && s.keywords.length > 0 && (
          <div className="text-[13px] text-[var(--ink)] font-semibold mb-6 leading-[1.4]">
            {s.keywords.join(' · ')}
          </div>
        )}

        {/* Primary CTA */}
        <button
          onClick={() => onWatch(1)}
          className="w-full p-[14px] rounded-[var(--r-md)] bg-[var(--plot-red)] text-white border-none text-[16px] font-semibold cursor-pointer mb-6 transition-colors duration-150 hover:bg-[var(--plot-red-hover)]"
        >
          처음부터 보기
        </button>

        {/* Details (Synopsis, Cast, Creator) */}
        <div className="flex flex-col gap-3 mb-8">
          {s.synopsis && (
            <p className="text-[var(--ink-80)] text-[14px] leading-[1.55] m-0">
              {s.synopsis}
            </p>
          )}

          {s.cast && s.cast.length > 0 && (
            <div className="text-[13px] text-[var(--ink-40)]">
              <span className="text-[var(--ink-60)] mr-1.5">출연진:</span>
              {s.cast.join(', ')}
            </div>
          )}

          {s.creator && (
            <div className="text-[13px] text-[var(--ink-40)]">
              <span className="text-[var(--ink-60)] mr-1.5">크리에이터:</span>
              {s.creator}
            </div>
          )}
        </div>

        {/* Episode list */}
        <div className="mt-8">
          <div className="text-[11px] text-[var(--fg-3)] uppercase tracking-[0.08em] font-medium mb-3">
            에피소드
          </div>
          <div className="flex flex-col">
            {Array.from({ length: s.totalEp }, (_, i) => {
              const epNum = s.totalEp - i;
              const real = s.episodes.find((e) => e.ep === epNum);
              const title = real?.title ?? '공개 예정';
              const locked = !real;
              return (
                <button
                  key={epNum}
                  onClick={() => {
                    if (real) {
                      onWatch(epNum);
                    } else {
                      setShowModal(true);
                    }
                  }}
                  className={`w-full flex items-center gap-[14px] py-3 border-b border-[var(--ink-10)] text-left bg-transparent ${locked ? 'opacity-40 cursor-default' : 'opacity-100 cursor-pointer hover:bg-[var(--ink-05)] transition-colors'}`}
                >
                  <div className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--fg-2)] w-9 font-medium shrink-0">
                    EP{String(epNum).padStart(2, '0')}
                  </div>
                  <div className="flex-1 text-[14px] font-medium text-[var(--ink)]">
                    {title}
                  </div>
                  {real && (
                    <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--fg-3)] shrink-0">
                      {fmtTime(real.duration)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Footer CTAs */}
      <div
        className={`fixed bottom-0 left-0 right-0 px-5 pt-4 pb-6 bg-[var(--paper)] border-t border-[var(--ink-10)] flex gap-2.5 z-50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] max-w-[690px] mx-auto ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className="flex-1 p-[12px_8px] rounded-[16px] bg-[var(--paper-20)] text-[var(--ink)] border border-[var(--ink-20)] text-[14px] font-semibold tracking-[-0.01em] cursor-pointer flex flex-col items-center justify-center gap-0.5 transition-all duration-150 hover:bg-[var(--paper-40)] active:scale-[0.97]"
        >
          <span className="text-[11px] text-[var(--ink-60)] font-medium">다음 화 보기</span>
          <span className="flex items-center gap-1 text-[#F5C518] text-[14px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#F5C518"/>
              <circle cx="12" cy="12" r="7" fill="#E5A900"/>
              <path d="M12 16.5C9.5 16.5 7.5 14.5 7.5 12C7.5 9.5 9.5 7.5 12 7.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            200
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className="flex-1 p-[12px_8px] rounded-[16px] bg-[linear-gradient(135deg,#E50914_0%,#B00710_100%)] text-[#FFFFFF] border-none text-[14px] font-bold tracking-[-0.01em] cursor-pointer shadow-[0_4px_14px_rgba(229,9,20,0.4)] transition-all duration-150 animate-[btnGlow_2s_infinite] flex flex-col items-center justify-center gap-0.5 hover:brightness-110 active:scale-[0.96]"
        >
          <span className="text-[11px] opacity-90 font-medium">전체 관람 (할인)</span>
          <div className="flex items-center gap-1.5">
            <span className="line-through opacity-60 text-[10px] font-medium">
              15,000
            </span>
            <span className="flex items-center gap-1 text-[#FFD700] text-[14px]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FFD700"/>
                <circle cx="12" cy="12" r="7" fill="#FDB813"/>
                <path d="M12 16.5C9.5 16.5 7.5 14.5 7.5 12C7.5 9.5 9.5 7.5 12 7.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              12,000
            </span>
          </div>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
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
              해당 기능은 현재 준비 중입니다.<br/>조금만 기다려주세요!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full p-[12px] rounded-full bg-[var(--plot-red)] text-white border-none font-semibold cursor-pointer hover:bg-[var(--plot-red-hover)] transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
