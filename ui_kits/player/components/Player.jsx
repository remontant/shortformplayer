// Full-screen vertical player for one episode.
// Fake video = poster image + simulated time progress.

function Player({ entry, active, onOpenSeries }) {
  const series = getSeries(entry.seriesId);
  const [progress, setProgress] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!active || paused) return;
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= entry.duration) return 0;
        return p + 0.3;
      });
    }, 120);
    return () => clearInterval(id);
  }, [active, paused, entry.duration]);

  React.useEffect(() => { if (!active) { setProgress(0); setPaused(false); } }, [active]);

  const togglePause = (e) => {
    if (e.target.closest('[data-noprop]')) return;
    setPaused(p => !p);
  };

  // Cycle through scene stills as the episode progresses.
  const stills = series.stills || [series.poster];
  const stillIdx = Math.min(
    stills.length - 1,
    Math.floor((progress / entry.duration) * stills.length)
  );

  return (
    <div onClick={togglePause} style={{
      position: 'relative', width: '100%', height: '100%',
      background: '#0F0E0D', overflow: 'hidden', cursor: 'pointer',
    }}>
      {/* Scene stills — cross-fade as progress advances (simulates video) */}
      {stills.map((src, i) => (
        <img key={src} src={src} alt=""
          onError={(e) => { e.currentTarget.src = series.poster; }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: i === stillIdx ? 1 : 0,
            transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), filter 200ms',
            filter: paused ? 'brightness(0.7)' : 'brightness(1)',
          }}/>
      ))}
      {/* Always-on poster underlay as safety net */}
      <img src={series.poster} alt=""
        style={{
          position: 'absolute', inset: 0, zIndex: -1,
          width: '100%', height: '100%', objectFit: 'cover',
          filter: paused ? 'brightness(0.7)' : 'brightness(1)',
        }}/>

      {/* Pause indicator */}
      {paused && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 3,
          pointerEvents: 'none',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: 9999,
            background: 'rgba(15,14,13,0.55)', backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FAF7F2',
          }}>
            <Icon.Play size={32} fill="#FAF7F2" />
          </div>
        </div>
      )}

      <PlayerChrome
        series={series} ep={entry.ep} epTitle={entry.epTitle}
        progress={progress} duration={entry.duration}
        onOpenSeries={(e) => { e?.stopPropagation?.(); onOpenSeries?.(series.id); }}
      />

      {/* Right rail actions */}
      <div data-noprop style={{
        position: 'absolute', right: 14, bottom: 130, zIndex: 4,
        display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center',
      }} onClick={(e) => e.stopPropagation()}>
        <LikeButton id={entry.id} size={52} />
        <RailButton><Icon.Share size={22} /></RailButton>
        <RailButton onClick={() => onOpenSeries?.(series.id)}><Icon.List size={22} /></RailButton>
      </div>
    </div>
  );
}

function RailButton({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 46, height: 46, borderRadius: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(250,247,242,0.10)',
      border: '1px solid rgba(250,247,242,0.18)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      color: '#FAF7F2', cursor: 'pointer',
      transition: 'transform 80ms cubic-bezier(0.22,1,0.36,1), background 150ms',
    }}
    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >{children}</button>
  );
}

window.Player = Player;
