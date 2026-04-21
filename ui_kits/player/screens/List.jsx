// Landing list page — entry point. Shows featured drama + full list.
// Tap a drama → opens player feed scoped to that series.

function List({ onOpenSeries }) {
  const featured = SERIES[0];
  const rest = SERIES.slice(1);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'var(--paper)',
      overflow: 'auto',
      fontFamily: 'Pretendard, Geist, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: 'var(--paper)',
        padding: '22px 20px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--ink-6)',
      }}>
        <div style={{
          fontFamily: 'Geist, sans-serif', fontSize: 22, fontWeight: 700,
          letterSpacing: '-0.01em', color: 'var(--ink)', lineHeight: 1,
        }}>Drama<span style={{color:'var(--plot-red)'}}>Pann</span></div>
        <button style={{
          width: 38, height: 38, borderRadius: 9999,
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ink)',
        }} aria-label="검색">
          <Icon.Search size={22}/>
        </button>
      </div>

      {/* Section label */}
      <div style={{
        padding: '20px 20px 10px',
        fontFamily: 'Geist Mono, monospace', fontSize: 11,
        letterSpacing: '0.18em', color: 'var(--ink-60)',
        textTransform: 'uppercase',
      }}>NOW PLAYING</div>

      {/* Featured card */}
      <div style={{ padding: '0 20px 28px' }}>
        <button onClick={() => onOpenSeries(featured.id)} style={{
          display: 'block', width: '100%', padding: 0, border: 'none',
          background: 'transparent', cursor: 'pointer', textAlign: 'left',
        }}>
          <div style={{
            position: 'relative', width: '100%', aspectRatio: '4 / 5',
            borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(15,14,13,0.20), 0 0 0 1px var(--ink-10)',
          }}>
            <img src={featured.poster} alt="" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            }}/>
            <div style={{
              position: 'absolute', inset: 'auto 0 0 0', height: '62%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.25) 55%, transparent)',
            }}/>
            {/* Genre chip */}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              padding: '5px 10px', borderRadius: 9999,
              background: 'rgba(250,247,242,0.16)',
              border: '1px solid rgba(250,247,242,0.22)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              fontFamily: 'Geist Mono, monospace', fontSize: 10,
              letterSpacing: '0.12em', color: '#FAF7F2',
            }}>{featured.genre}</div>
            {/* Text block */}
            <div style={{
              position: 'absolute', left: 20, right: 20, bottom: 18, color: '#FAF7F2',
            }}>
              <div style={{
                fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em',
                lineHeight: 1.15, marginBottom: 6,
              }}>{featured.title}</div>
              <div style={{
                fontSize: 13, lineHeight: 1.45, color: 'rgba(250,247,242,0.82)',
                marginBottom: 14, textWrap: 'pretty',
              }}>{featured.tagline}</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 9999,
                background: '#FAF7F2', color: '#0F0E0D',
                fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em',
              }}>
                <Icon.Play size={14} fill="#0F0E0D"/>
                <span>EP1부터 보기</span>
                <span style={{
                  marginLeft: 4, paddingLeft: 10,
                  borderLeft: '1px solid rgba(15,14,13,0.18)',
                  fontFamily: 'Geist Mono, monospace', fontSize: 11,
                  color: 'rgba(15,14,13,0.55)', letterSpacing: '0.06em',
                }}>{featured.episodes.length}/{featured.totalEp} EP</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* List section */}
      <div style={{
        padding: '0 20px 6px',
        fontFamily: 'Geist Mono, monospace', fontSize: 11,
        letterSpacing: '0.18em', color: 'var(--ink-60)',
        textTransform: 'uppercase',
      }}>ALL SERIES · {SERIES.length}</div>

      <div style={{ padding: '6px 12px 32px', display: 'flex', flexDirection: 'column' }}>
        {rest.map((s, i) => (
          <button key={s.id} onClick={() => onOpenSeries(s.id)} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 8px', border: 'none', background: 'transparent',
            cursor: 'pointer', textAlign: 'left',
            borderBottom: i < rest.length - 1 ? '1px solid var(--ink-6)' : 'none',
          }}>
            {/* Rank */}
            <div style={{
              fontFamily: 'Geist Mono, monospace', fontSize: 13,
              fontWeight: 600, color: 'var(--ink-40)',
              width: 22, textAlign: 'center', flexShrink: 0,
              fontVariantNumeric: 'tabular-nums',
            }}>{String(i + 2).padStart(2,'0')}</div>
            {/* Thumb */}
            <div style={{
              width: 64, height: 84, borderRadius: 10, overflow: 'hidden',
              flexShrink: 0, position: 'relative',
              boxShadow: '0 0 0 1px var(--ink-10)',
            }}>
              <img src={s.poster} alt="" style={{
                width: '100%', height: '100%', objectFit: 'cover',
              }}/>
            </div>
            {/* Meta */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 16, fontWeight: 600, color: 'var(--ink)',
                letterSpacing: '-0.01em', marginBottom: 4,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{s.title}</div>
              <div style={{
                fontSize: 12.5, color: 'var(--ink-60)',
                lineHeight: 1.4, marginBottom: 6,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden', wordBreak: 'keep-all',
              }}>{s.tagline}</div>
              <div style={{
                display: 'flex', gap: 8, alignItems: 'center',
                fontFamily: 'Geist Mono, monospace', fontSize: 10,
                letterSpacing: '0.08em', color: 'var(--ink-40)',
              }}>
                <span>{s.genre}</span>
                <span style={{ width: 2, height: 2, borderRadius: 9999, background: 'var(--ink-20)' }}/>
                <span>S{s.season} · {s.episodes.length}/{s.totalEp} EP</span>
              </div>
            </div>
            {/* Play glyph */}
            <div style={{
              width: 36, height: 36, borderRadius: 9999, flexShrink: 0,
              background: 'var(--plot-red)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FAF7F2',
            }}>
              <Icon.Play size={14} fill="#FAF7F2"/>
            </div>
          </button>
        ))}
      </div>

      {/* Footer tag */}
      <div style={{
        padding: '20px 20px 32px',
        fontFamily: 'Geist Mono, monospace', fontSize: 10,
        letterSpacing: '0.2em', color: 'var(--ink-40)',
        textAlign: 'center',
      }}>한 입씩 먹는 드라마 · DRAMA PANN</div>
    </div>
  );
}
window.List = List;
