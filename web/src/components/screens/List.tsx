'use client';

import Image from 'next/image';
import { SERIES } from '@/lib/data';
import { Play } from '@/components/Icons';

interface Props {
  onOpenSeries: (id: string) => void;
}

export default function List({ onOpenSeries }: Props) {
  const featured = SERIES[0];
  const rest = SERIES.slice(1);

  if (!featured) return null;

  return (
    <div className="bg-[var(--paper)] font-[family-name:var(--font-sans)] min-h-screen">
      {/* Sticky header */}
      <div className="sticky top-0 z-[5] bg-[var(--paper)] pt-[22px] px-5 pb-4 flex items-center justify-between border-b border-[var(--ink-10)]">
        <div className="font-[family-name:var(--font-sans)] text-[22px] font-bold tracking-[-0.01em] text-[var(--ink)] leading-none">
          Drama <span className="text-[var(--plot-red)]">Pann</span>
        </div>
      </div>

      {/* Section label */}
      <div className="px-5 pt-5 pb-2.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] text-[var(--ink-60)] uppercase">
        NOW PLAYING
      </div>

      {/* Featured card */}
      <div className="px-5 pb-7">
        <button
          onClick={() => onOpenSeries(featured.id)}
          className="block w-full p-0 border-none bg-transparent cursor-pointer text-left"
        >
          <div className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden shadow-[0_12px_32px_rgba(15,14,13,0.20),0_0_0_1px_var(--ink-10)]">
            <Image
              src={featured.poster}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
            {/* Bottom gradient overlay */}
            <div className="absolute inset-[auto_0_0_0] h-[62%] bg-[linear-gradient(to_top,rgba(0,0,0,0.88),rgba(0,0,0,0.25)_55%,transparent)]" />
            {/* Genre chip */}
            <div className="absolute top-4 left-4 px-2.5 py-1.5 rounded-full bg-[var(--paper-10)] border border-[var(--paper-20)] backdrop-blur-[10px] font-[family-name:var(--font-mono)] text-[10px] tracking-[0.12em] text-[var(--paper-80)] uppercase">
              {featured.genre}
            </div>
            {/* Text block */}
            <div className="absolute left-5 right-5 bottom-[18px] text-[var(--ink)]">
              <div className="text-[26px] font-bold tracking-[-0.02em] leading-[1.15] mb-1.5">
                {featured.title}
              </div>
              <div className="text-[13px] leading-[1.45] text-[var(--ink-80)] mb-[14px]">
                {featured.tagline}
              </div>
              {/* CTA */}
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper)] text-[13px] font-semibold tracking-[-0.01em]">
                <Play size={14} strokeWidth={0} fill="var(--paper)" />
                <span>EP1부터 보기</span>
                <span className="ml-1 pl-2.5 border-l border-[var(--paper-20)] font-[family-name:var(--font-mono)] text-[11px] text-[var(--paper-60)] tracking-[0.06em]">
                  {featured.episodes.length}/{featured.totalEp} EP
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* ALL SERIES label */}
      <div className="px-5 pb-1.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] text-[var(--ink-60)] uppercase">
        ALL SERIES · {SERIES.length}
      </div>

      {/* Series list rows */}
      <div className="px-3 pt-1.5 pb-8 flex flex-col">
        {rest.map((s, i) => {
          const isComingSoon = s.isComingSoon;

          return (
            <button
              key={s.id}
              onClick={() => {
                if (!isComingSoon) onOpenSeries(s.id);
              }}
              className={`flex items-center gap-[14px] px-2 py-[14px] border-none bg-transparent ${isComingSoon ? 'cursor-default opacity-40' : 'cursor-pointer'} text-left ${i < rest.length - 1 ? 'border-b border-[var(--ink-10)]' : ''}`}
            >
              {/* Rank */}
              <div className="font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[var(--ink-40)] w-[22px] text-center shrink-0 tabular-nums">
                {String(i + 2).padStart(2, '0')}
              </div>
              {/* Poster thumb */}
              <div className="w-16 h-[84px] rounded-[10px] overflow-hidden shrink-0 relative shadow-[0_0_0_1px_var(--ink-10)]">
                <Image
                  src={s.poster}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {/* Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="text-base font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                    {s.title}
                  </div>
                  {isComingSoon && (
                    <div className="px-1.5 py-[3px] rounded bg-[rgba(230,57,70,0.08)] text-[var(--plot-red)] font-[family-name:var(--font-mono)] text-[9.5px] font-semibold tracking-[0.08em] shrink-0">
                      COMING SOON
                    </div>
                  )}
                </div>
                <div className="text-[12.5px] text-[var(--ink-60)] leading-[1.4] mb-1.5 line-clamp-2 break-keep">
                  {s.tagline}
                </div>
                <div className="flex gap-2 items-center font-[family-name:var(--font-mono)] text-[10px] tracking-[0.08em] text-[var(--ink-40)]">
                  <span>{s.genre}</span>
                  <span className="w-[2px] h-[2px] rounded-full bg-[var(--ink-20)]" />
                  <span>
                    S{s.season} · {isComingSoon ? '공개 예정' : `${s.episodes.length}/${s.totalEp} EP`}
                  </span>
                </div>
              </div>
              {/* Play glyph */}
              {!isComingSoon && (
                <div className="w-9 h-9 rounded-full shrink-0 bg-[var(--plot-red)] flex items-center justify-center text-[var(--paper)]">
                  <Play size={14} strokeWidth={0} fill="var(--paper)" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 pt-5 pb-8 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--ink-40)] text-center">
        한 입씩 먹는 드라마 · DRAMA PANN
      </div>
    </div>
  );
}
