'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Play, List, Mute, Volume } from '@/components/Icons';
import LikeButton from '@/components/LikeButton';
import PlayerChrome from './PlayerChrome';
import { FeedEntry, getSeries } from '@/lib/data';

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
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause based on active state and user interaction
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (active && !paused) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser
        setPaused(true);
      });
    } else {
      videoRef.current.pause();
    }
  }, [active, paused]);

  // Reset progress when not active
  useEffect(() => {
    if (!active) {
      setProgress(0);
      setPaused(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [active]);

  const togglePause = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-noprop]')) return;
      setPaused((p) => !p);
    },
    []
  );

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
    }
  };

  // Video URL (placeholder for now)
  const videoUrl = entry.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const duration = videoRef.current?.duration || entry.duration || 90;

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
      <video
        ref={videoRef}
        src={videoUrl}
        poster={series.poster}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
        muted={isMuted}
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: paused ? 'brightness(0.7)' : 'brightness(1)',
          transition: 'filter 200ms',
        }}
      />

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