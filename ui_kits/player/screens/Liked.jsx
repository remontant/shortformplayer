function Liked({ onOpenSeries }) {
  const likedIds = (() => {
    try { return JSON.parse(localStorage.getItem('plot.liked') || '[]'); } catch { return []; }
  })();
  // Flatten all episodes across all series, match against liked ids
  const allEntries = SERIES.flatMap(s => s.episodes.map(e => ({
    id: `${s.id}-${e.ep}`, seriesId: s.id, ep: e.ep, epTitle: e.title,
  })));
  const entries = allEntries.filter(f => likedIds.includes(f.id));
  const empty = entries.length === 0;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', background: 'var(--paper)' }}>
      <TopBar title="저장함" />
      <div style={{ padding: '20px 16px' }}>
        {empty ? (
          <div style={{ padding: '80px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🎬</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>아직 저장한 회차가 없어요.</div>
            <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>맘에 드는 장면에서 ♡ 눌러보세요.</div>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: 'var(--fg-3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {entries.length}개 저장됨
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {entries.map(e => {
                const s = getSeries(e.seriesId);
                return (
                  <button key={e.id} onClick={() => onOpenSeries(s.id)} style={{
                    background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left',
                  }}>
                    <div style={{
                      width: '100%', aspectRatio: '9/16',
                      borderRadius: 'var(--r-lg)', overflow: 'hidden',
                      border: '1px solid var(--ink-10)', position: 'relative',
                    }}>
                      <img src={s.poster} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                      <div style={{
                        position: 'absolute', top: 10, right: 10, padding: '3px 8px',
                        background: 'rgba(15,14,13,0.5)', backdropFilter: 'blur(8px)',
                        borderRadius: 9999, fontFamily: 'Geist Mono, monospace',
                        fontSize: 10, color: '#FAF7F2',
                      }}>EP{String(e.ep).padStart(2,'0')}</div>
                    </div>
                    <div style={{ padding: '10px 2px 0' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--fg-2)', fontFamily: 'Geist Mono, monospace' }}>{e.epTitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
window.Liked = Liked;
