'use client';

import { useState, useEffect } from 'react';
import List from './screens/List';
import Feed from './screens/Feed';
import SeriesDetail from './screens/SeriesDetail';

type Route = 'list' | 'feed' | 'series';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export default function App() {
  const [route, setRoute] = useState<Route>('list');
  const [seriesId, setSeriesId] = useState<string | null>(null);
  const [startEp, setStartEp] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const r = readStorage<string>('dp.route', 'list') as Route;
    const s = readStorage<string | null>('dp.seriesId', null);
    if ((r === 'feed' || r === 'series') && !s) {
      setRoute('list');
    } else {
      setRoute(r);
      setSeriesId(s);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    writeStorage('dp.route', route);
    if (seriesId) writeStorage('dp.seriesId', seriesId);
  }, [route, seriesId, mounted]);

  useEffect(() => {
    const handler = () => setRoute('list');
    window.addEventListener('dp:back-to-list', handler);
    return () => window.removeEventListener('dp:back-to-list', handler);
  }, []);

  const openSeries = (id: string) => { setSeriesId(id); setRoute('feed'); setStartEp(null); };
  const openDetail = (id: string) => { setSeriesId(id); setRoute('series'); };
  const backToList = () => { setRoute('list'); setStartEp(null); };
  const backToFeed = () => { setRoute('feed'); setStartEp(null); };
  const watchEp = (epNum: number) => { setRoute('feed'); setStartEp(epNum); };

  if (!mounted) return null;

  return (
    <>
      <div className="side-text side-text-left">
        DRAMA PANN <span className="opacity-40">·</span> 한 입씩 먹는 드라마
      </div>
      <div className="side-text side-text-right">
        2026 <span className="opacity-40">·</span> VERTICAL CINEMA
      </div>
      <div className="w-full max-w-[690px] mx-auto min-h-[100dvh] relative bg-[var(--paper)] transition-colors duration-200">
        {route === 'list' && <List onOpenSeries={openSeries} />}
        {route === 'feed' && seriesId && (
          <Feed seriesId={seriesId} initialEp={startEp} onBack={backToList} onOpenSeries={openDetail} />
        )}
        {route === 'series' && seriesId && (
          <SeriesDetail seriesId={seriesId} onBack={backToFeed} onWatch={watchEp} />
        )}
      </div>
    </>
  );
}
