// Vertical scroll-snap feed, scoped to a single series.
// Each slot = full frame player for one episode of that series.

function Feed({ seriesId, onOpenSeries }) {
  const feed = React.useMemo(() => getFeedFor(seriesId), [seriesId]);
  const [idx, setIdx] = React.useState(0);
  const containerRef = React.useRef(null);

  // Reset to EP1 when the series changes
  React.useEffect(() => {
    setIdx(0);
    const el = containerRef.current;
    if (el) el.scrollTop = 0;
  }, [seriesId]);

  const onScroll = (e) => {
    const h = e.currentTarget.clientHeight;
    const newIdx = Math.round(e.currentTarget.scrollTop / h);
    if (newIdx !== idx && newIdx >= 0 && newIdx < feed.length) setIdx(newIdx);
  };

  if (!feed.length) return null;

  return (
    <div ref={containerRef}
         onScroll={onScroll}
         style={{
           position: 'absolute', inset: 0, overflow: 'auto',
           scrollSnapType: 'y mandatory',
           scrollBehavior: 'smooth',
           background: '#0F0E0D',
         }}>
      {feed.map((entry, i) => (
        <div key={entry.id} style={{
          height: '100%', width: '100%',
          scrollSnapAlign: 'start', scrollSnapStop: 'always',
          position: 'relative',
        }}>
          {entry.comingSoon
            ? <ComingSoon entry={entry} onBackToList={() => window.dispatchEvent(new CustomEvent('dp:back-to-list'))} />
            : <Player entry={entry} active={i === idx} onOpenSeries={onOpenSeries} />
          }
        </div>
      ))}

      {/* Swipe hint (first ep only) */}
      {idx === 0 && feed.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          zIndex: 5, pointerEvents: 'none',
          color: 'rgba(250,247,242,0.55)', fontSize: 11,
          fontFamily: 'Geist Mono, monospace', letterSpacing: '0.06em',
          animation: 'dpHint 2400ms ease-in-out infinite',
        }}>
          <style>{`
            @keyframes dpHint { 0%,100% { opacity: 0; transform: translate(-50%, 0); } 40%,70% { opacity: 1; transform: translate(-50%, -6px); } }
          `}</style>
          ↑ 다음 에피소드
        </div>
      )}
    </div>
  );
}
window.Feed = Feed;
