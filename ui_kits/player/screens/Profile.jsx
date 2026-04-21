function Profile() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', background: 'var(--paper)' }}>
      <TopBar title="나" />
      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 9999,
            background: 'var(--plot-red-soft)', color: 'var(--plot-red-press)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 600, fontFamily: 'Geist, sans-serif',
          }}>보</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>보라매3번출구</div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)', fontFamily: 'Geist Mono, monospace', whiteSpace: 'nowrap' }}>since 2026.04</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
          {[
            { n: '24', l: '저장' },
            { n: '7', l: '구독' },
            { n: '142', l: '본 편' },
          ].map(s => (
            <div key={s.l} style={{
              padding: '14px 12px', borderRadius: 'var(--r-md)',
              border: '1px solid var(--ink-10)', background: 'var(--paper)',
            }}>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'Geist, sans-serif' }}>{s.n}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--ink-10)' }}>
          {['알림 설정', '데이터 절약 모드', '언어', '이용약관', '로그아웃'].map((lbl, i) => (
            <button key={lbl} style={{
              width: '100%', padding: '16px 4px', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
              background: 'transparent', border: 'none',
              borderBottom: '1px solid var(--ink-10)', cursor: 'pointer',
              fontSize: 14, color: i === 4 ? 'var(--danger)' : 'var(--ink)', textAlign: 'left',
              wordBreak: 'keep-all',
            }}>
              <span style={{ whiteSpace: 'nowrap' }}>{lbl}</span>
              <span style={{ color: 'var(--fg-3)' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
window.Profile = Profile;
