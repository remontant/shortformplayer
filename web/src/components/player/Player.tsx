'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, List, Mute, Volume } from '@/components/Icons';
import LikeButton from '@/components/LikeButton';
import PlayerChrome from './PlayerChrome';
import { FeedEntry, getSeries } from '@/lib/data';

function extractYoutubeId(url: string) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|\?v=))([\w-]{11})/);
  return match ? match[1] : null;
}

interface Props {
  entry: FeedEntry;
  active: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onBack: () => void;
  onOpenSeries: (id: string) => void;
  onEnded?: () => void;
}

function RailButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-[46px] h-[46px] rounded-full flex items-center justify-center bg-[var(--ink-10)] border border-[var(--ink-20)] backdrop-blur-[12px] text-[var(--ink)] cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--ink-20)] active:scale-[0.92]"
    >
      {children}
    </button>
  );
}

export default function Player({ entry, active, isMuted, onToggleMute, onBack, onOpenSeries, onEnded }: Props) {
  const series = getSeries(entry.seriesId)!;
  const [progress, setProgress] = useState(0);
  const duration = entry.duration || 90;
  const [paused, setPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoUrl = entry.videoUrl || "https://www.youtube.com/watch?v=aqz-KE-bpKQ";
  const videoId = extractYoutubeId(videoUrl);

  const sendCommand = useCallback((func: string, args: any[] = []) => {
    if (!iframeRef.current?.contentWindow) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    } catch (e) {}
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      sendCommand(active && !paused ? 'playVideo' : 'pauseVideo');
    }, 150);
    return () => clearTimeout(timer);
  }, [active, paused, sendCommand]);

  // 유튜브 실제 영상 종료(ENDED) 이벤트 감지
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        // playerState 0은 영상 종료(ENDED)를 의미합니다.
        if (data.event === 'infoDelivery' && data.info && data.info.playerState === 0) {
          if (active) {
            onEnded?.();
          }
        }
      } catch (e) {}
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [active, onEnded]);

  useEffect(() => {
    sendCommand(isMuted ? 'mute' : 'unMute');
  }, [isMuted, sendCommand]);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      setPaused(false);
      sendCommand('seekTo', [0, true]);
    }
  }, [active, sendCommand]);

  useEffect(() => {
    if (!active || paused) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= duration) {
          onEnded?.();
          return p;
        }
        return p + 0.5;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [active, paused, duration, onEnded]);

  const togglePause = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-noprop]')) return;
      setPaused((p) => !p);
    },
    []
  );

  return (
    <div
      onClick={togglePause}
      className="relative w-full h-full bg-[var(--paper)] overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 z-0">
        {videoId && (
          <iframe
            ref={iframeRef}
            className="youtube-iframe-full"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=${active ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&playsinline=1&rel=0&playlist=${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Invisible click interceptor */}
      <div className="absolute inset-0 z-[1]" />

      {/* Pause indicator */}
      {paused && (
        <div className="absolute inset-0 flex items-center justify-center z-[3] pointer-events-none">
          <div className="w-[80px] h-[80px] rounded-full bg-[var(--paper-60)] backdrop-blur-[16px] flex items-center justify-center text-[var(--ink)]">
            <Play size={32} strokeWidth={0} fill="var(--ink)" />
          </div>
        </div>
      )}

      {/* Player chrome */}
      <div className="absolute inset-0 z-[2]">
        <PlayerChrome
          series={series}
          ep={entry.ep!}
          epTitle={entry.epTitle!}
          progress={progress}
          duration={duration}
          onBack={onBack}
          onOpenSeries={() => onOpenSeries(series.id)}
        />
      </div>

      {/* Right rail */}
      <div
        data-noprop="true"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-[14px] bottom-[130px] z-[4] flex flex-col gap-[14px] items-center"
      >
        <LikeButton id={entry.id} size={52} />
        <RailButton onClick={onToggleMute}>
          {isMuted ? (
            <Mute size={22} strokeWidth={1.75} />
          ) : (
            <Volume size={22} strokeWidth={1.75} />
          )}
        </RailButton>
        <RailButton onClick={() => onOpenSeries(series.id)}>
          <List size={22} strokeWidth={1.75} />
        </RailButton>
      </div>
    </div>
  );
}