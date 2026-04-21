function EpisodeBadge({ season, ep, time }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px', borderRadius: 9999,
      background: 'rgba(15,14,13,0.4)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      color: '#FAF7F2',
      fontFamily: 'Geist Mono, monospace',
      fontSize: 12, letterSpacing: '0.02em',
      border: '1px solid rgba(250,247,242,0.14)',
    }}>
      <span>S{season}·EP{String(ep).padStart(2, '0')}</span>
      {time && <><span style={{opacity:.4}}>·</span><span>{time}</span></>}
    </div>
  );
}
window.EpisodeBadge = EpisodeBadge;
