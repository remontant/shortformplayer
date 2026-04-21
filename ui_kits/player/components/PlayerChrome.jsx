// Overlay chrome on top of player: wordmark top-left, episode capsule top-right,
// bottom protection gradient with title + ep meta + progress.

function PlayerChrome({ series, ep, epTitle, progress, duration, onOpenSeries }) {
  return (
    <>
      {/* Top protection gradient */}
      <div style={{
        position: 'absolute', inset: '0 0 auto 0', height: '28%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)',
        pointerEvents: 'none',
      }}/>
      {/* Bottom protection gradient */}
      <div style={{
        position: 'absolute', inset: 'auto 0 0 0', height: '38%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2) 60%, transparent)',
        pointerEvents: 'none',
      }}/>

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '22px 20px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button data-noprop onClick={(e) => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('dp:back-to-list'));
          }} style={{
            width: 38, height: 38, borderRadius: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(15,14,13,0.35)',
            border: '1px solid rgba(250,247,242,0.14)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            color: '#FAF7F2', cursor: 'pointer', padding: 0,
          }} aria-label="목록으로">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div style={{
            fontFamily: 'Geist, sans-serif', fontSize: 18, fontWeight: 700,
            letterSpacing: '0.02em', color: 'rgba(250,247,242,0.95)',
            lineHeight: 1,
          }}>Drama<span style={{color:'#E63946'}}>Pann</span></div>
        </div>
        <EpisodeBadge season={series.season} ep={ep} />
      </div>

      {/* Bottom meta */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 18px 20px', zIndex: 2, color: '#FAF7F2',
      }}>
        <button onClick={onOpenSeries} style={{
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          textAlign: 'left', color: '#FAF7F2',
          fontFamily: 'Geist, sans-serif', fontSize: 22, fontWeight: 600,
          letterSpacing: '-0.015em', marginBottom: 4, display: 'block',
        }}>{series.title}</button>
        <div style={{
          fontFamily: 'Geist Mono, monospace', fontSize: 11,
          color: 'rgba(250,247,242,0.72)', marginBottom: 12,
        }}>
          EP{String(ep).padStart(2,'0')} · {epTitle}
        </div>
        <ProgressBar value={progress} total={duration} />
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Geist Mono, monospace', fontSize: 10,
          color: 'rgba(250,247,242,0.55)', marginTop: 6,
        }}>
          <span>{fmtTime(progress)}</span><span>{fmtTime(duration)}</span>
        </div>
      </div>
    </>
  );
}
window.PlayerChrome = PlayerChrome;
