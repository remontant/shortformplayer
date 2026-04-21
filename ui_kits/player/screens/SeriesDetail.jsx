function SeriesDetail({ seriesId, onBack }) {
  const s = getSeries(seriesId);
  if (!s) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'auto', background: 'var(--paper)',
    }}>
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '9/12' }}>
        <img src={s.poster} alt=""
             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
        <div style={{
          position: 'absolute', inset: 'auto 0 0 0', height: '60%',
          background: 'linear-gradient(to top, var(--paper) 8%, rgba(250,247,242,0) 90%)',
        }}/>
        <button onClick={onBack} style={{
          position: 'absolute', top: 16, left: 16, zIndex: 2,
          width: 36, height: 36, borderRadius: 9999,
          background: 'rgba(15,14,13,0.5)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(250,247,242,0.2)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAF7F2',
        }}><Icon.ChevronLeft size={20}/></button>
      </div>

      <div style={{ padding: '0 20px 32px', marginTop: -90, position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex', padding: '4px 10px', borderRadius: 9999,
          background: 'var(--plot-red)', color: '#FAF7F2',
          fontFamily: 'Geist Mono, monospace', fontSize: 11, fontWeight: 500,
          marginBottom: 12,
        }}>{s.genre}</div>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.025em', margin: '0 0 8px' }}>{s.title}</h1>
        <p style={{ color: 'var(--fg-2)', fontSize: 15, margin: '0 0 16px', lineHeight: 1.5 }}>{s.tagline}</p>
        <div style={{
          fontFamily: 'Geist Mono, monospace', fontSize: 12, color: 'var(--fg-3)',
          marginBottom: 24,
        }}>S{s.season} · {s.totalEp} EP · 평균 1:40</div>

        <button style={{
          width: '100%', padding: '14px', borderRadius: 'var(--r-md)',
          background: 'var(--plot-red)', color: '#FAF7F2', border: 'none',
          fontSize: 16, fontWeight: 600, cursor: 'pointer', marginBottom: 12,
          transition: 'background 150ms',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--plot-red-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--plot-red)'}
        onClick={onBack}
        >다음 편 보기 · EP{String(s.episodes[0].ep).padStart(2,'0')}</button>
        <button style={{
          width: '100%', padding: '14px', borderRadius: 'var(--r-md)',
          background: 'transparent', color: 'var(--ink)',
          border: '1px solid var(--ink-10)', fontSize: 15, fontWeight: 500, cursor: 'pointer',
        }}>처음부터 보기</button>

        <div style={{ marginTop: 32 }}>
          <div style={{
            fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase',
            letterSpacing: '0.08em', fontWeight: 500, marginBottom: 12,
          }}>에피소드</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Array.from({length: s.totalEp}, (_, i) => {
              const epNum = s.totalEp - i;
              const real = s.episodes.find(e => e.ep === epNum);
              const title = real?.title || '공개 예정';
              const locked = !real;
              return (
                <div key={epNum} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 0', borderBottom: '1px solid var(--ink-10)',
                  opacity: locked ? 0.4 : 1,
                }}>
                  <div style={{
                    fontFamily: 'Geist Mono, monospace', fontSize: 13,
                    color: 'var(--fg-2)', width: 36, fontWeight: 500,
                  }}>EP{String(epNum).padStart(2,'0')}</div>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{title}</div>
                  {real && (
                    <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: 'var(--fg-3)' }}>
                      {fmtTime(real.duration)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
window.SeriesDetail = SeriesDetail;
