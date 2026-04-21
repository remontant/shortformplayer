'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
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
      style={{
        width: 46,
        height: 46,
        borderRadius: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(250,247,242,0.10)',
        border: '1px solid rgba(250,247,242,0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#FAF7F2',
        cursor: 'pointer',
        transition: 'transform 80ms cubic-bezier(0.22,1,0.36,1), background 150ms',
      }}
      onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.92)')}
      onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
    >
      {children}
    </button>
  );
}

export default function Player({ entry, active, isMuted, onToggleMute, onBack, onOpenSeries, onEnded }: Props) {
  const series = getSeries(entry.seriesId)!;
  const [progress, setProgress] = useState(0);
  const duration = entry.duration || 90; // Use hardcoded duration from data.ts
  const [paused, setPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoUrl = entry.videoUrl || "https://www.youtube.com/watch?v=aqz-KE-bpKQ";
  const videoId = extractYoutubeId(videoUrl);

  // Send postMessage to YouTube Iframe
  const sendCommand = useCallback((func: string, args: any[] = []) => {
    if (!iframeRef.current?.contentWindow) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    } catch (e) {}
  }, []);

  // Play / Pause via postMessage
  useEffect(() => {
    // We use a small timeout to ensure the iframe is ready to receive messages after mount
    const timer = setTimeout(() => {
      sendCommand(active && !paused ? 'playVideo' : 'pauseVideo');
    }, 150);
    return () => clearTimeout(timer);
  }, [active, paused, sendCommand]);

  // Mute / Unmute via postMessage
  useEffect(() => {
    sendCommand(isMuted ? 'mute' : 'unMute');
  }, [isMuted, sendCommand]);

  // Reset Progress when inactive
  useEffect(() => {
    if (!active) {
      setProgress(0);
      setPaused(false);
      sendCommand('seekTo', [0, true]);
    }
  }, [active, sendCommand]);

  // Fake Progress Bar & Auto-End
  useEffect(() => {
    if (!active || paused) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= duration) {
          onEnded?.();
          return p;
        }
        return p + 0.5; // Update every 500ms
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
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0F0E0D',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          zIndex: 0,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {videoId && (
          <iframe
            ref={iframeRef}
            className="youtube-iframe-full"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=${active ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Invisible click interceptor to ensure parent onClick works and iframe is not clicked directly */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      {/* Pause indicator */}
      {paused && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 9999,
              background: 'rgba(15,14,13,0.55)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF7F2',
            }}
          >
            <Play size={32} strokeWidth={0} fill="#FAF7F2" />
          </div>
        </div>
      )}

      {/* Player chrome (gradients + top bar + bottom meta) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
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
        style={{
          position: 'absolute',
          right: 14,
          bottom: 130,
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          alignItems: 'center',
        }}
      >
        <LikeButton id={entry.id} size={52} />
        <RailButton onClick={onToggleMute}>
          {isMuted ? (
            <Mute size={22} strokeWidth={1.75} />
          ) : (
            <Volume size={22} strokeWidth={1.75} />
          )}
        </RailButton>
        <RailButton
          onClick={() => onOpenSeries(series.id)}
        >
          <List size={22} strokeWidth={1.75} />
        </RailButton>
      </div>
    </div>
  );
}