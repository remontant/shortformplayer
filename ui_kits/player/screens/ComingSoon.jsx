// Coming-soon slot shown at the end of a series feed.

function ComingSoon({ entry, onBackToList }) {
  const s = getSeries(entry.seriesId);
  const releasedCount = s.episodes.length;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#0F0E0D',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      color: '#FAF7F2', padding: '0 32px',
      overflow: 'hidden',
    }}>
      {/* Blurred poster backdrop */}
      <img src={s.poster} alt="" aria-hidden="true" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', filter: 'blur(40px) brightness(0.35)',
        transform: 'scale(1.15)',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(15,14,13,0.55) 0%, rgba(15,14,13,0.85) 100%)',
      }}/>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 320 }}>
        {/* Poster thumb */}
        <div style={{
          width: 120, height: 160, margin: '0 auto 28px',
          borderRadius: 14, overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(250,247,242,0.12)',
        }}>
          <img src={s.poster} alt="" style={{
            width: '100%', height: '100%', objectFit: 'cover',
          }}/>
        </div>

        {/* Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 9999,
          background: 'rgba(230,57,70,0.18)',
          border: '1px solid rgba(230,57,70,0.45)',
          color: '#F5A1A8',
          fontFamily: 'Geist Mono, monospace', fontSize: 10.5,
          letterSpacing: '0.16em', marginBottom: 18,
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 9999, background: '#E63946',
            animation: 'dpPulse 1600ms ease-in-out infinite',
          }}/>
          Coming Soon
        </div>
        <style>{`
          @keyframes dpPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        `}</style>

        <h2 style={{
          fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em',
          lineHeight: 1.2, margin: '0 0 12px', color: '#FAF7F2',
        }}>EP{String(entry.nextEp).padStart(2,'0')}는 준비 중이에요</h2>

        <p style={{
          fontSize: 14, lineHeight: 1.55,
          color: 'rgba(250,247,242,0.72)',
          margin: '0 0 6px', textWrap: 'pretty',
        }}>
          「{s.title}」는 현재 {releasedCount}화까지 공개되었어요.
        </p>
        <p style={{
          fontSize: 14, lineHeight: 1.55,
          color: 'rgba(250,247,242,0.72)',
          margin: '0 0 32px',
        }}>
          다음 이야기는 곧 찾아옵니다.
        </p>

        {/* Progress */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 28,
        }}>
          <div style={{
            flex: 1, height: 4, borderRadius: 9999,
            background: 'rgba(250,247,242,0.12)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${(releasedCount / s.totalEp) * 100}%`,
              height: '100%', background: '#E63946',
              borderRadius: 9999,
            }}/>
          </div>
          <div style={{
            fontFamily: 'Geist Mono, monospace', fontSize: 11,
            color: 'rgba(250,247,242,0.85)', letterSpacing: '0.06em',
            fontVariantNumeric: 'tabular-nums',
          }}>{releasedCount}/{s.totalEp}</div>
        </div>

        {/* Actions */}
        <button onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('dp:notify', { detail: { seriesId: s.id } })); }} style={{
          width: '100%', padding: '14px', borderRadius: 9999,
          background: '#FAF7F2', color: '#0F0E0D',
          border: 'none', fontSize: 14, fontWeight: 600,
          letterSpacing: '-0.01em', cursor: 'pointer',
          marginBottom: 10,
        }}>공개 알림 받기</button>
        <button onClick={(e) => { e.stopPropagation(); onBackToList?.(); }} style={{
          width: '100%', padding: '12px', borderRadius: 9999,
          background: 'transparent',
          color: 'rgba(250,247,242,0.72)',
          border: '1px solid rgba(250,247,242,0.2)',
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
        }}>다른 드라마 보기</button>
      </div>
    </div>
  );
}
window.ComingSoon = ComingSoon;
