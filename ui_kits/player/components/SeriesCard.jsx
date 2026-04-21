function SeriesCard({ series, onClick, small = false }) {
  const [hover, setHover] = React.useState(false);
  const w = small ? 140 : 180;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: w, textAlign: 'left', background: 'transparent',
        border: 'none', padding: 0, cursor: 'pointer',
        transition: 'transform 150ms cubic-bezier(0.22,1,0.36,1)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div style={{
        width: '100%', aspectRatio: '9/16',
        borderRadius: 'var(--r-lg)', overflow: 'hidden',
        boxShadow: hover ? 'var(--e2)' : 'var(--e1)',
        border: '1px solid var(--ink-10)',
        transition: 'box-shadow 150ms',
      }}>
        <img src={series.poster} alt={series.title}
             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
      </div>
      <div style={{ padding: '10px 2px 0' }}>
        <div style={{ fontSize: small ? 13 : 15, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 2 }}>{series.title}</div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: 'var(--fg-2)' }}>
          S{series.season} · {series.totalEp} EP · {series.genre}
        </div>
      </div>
    </button>
  );
}
window.SeriesCard = SeriesCard;
