// Root app: desktop frame (centered 9:16) + route state.
// Routes: list (landing) | feed (vertical player) | series (detail) | liked | profile

function App() {
  const [route, setRoute] = React.useState(() => {
    try {
      const r = localStorage.getItem('dp.route') || 'list';
      const s = localStorage.getItem('dp.seriesId');
      // feed/series routes require a seriesId; fall back to list
      if ((r === 'feed' || r === 'series') && !s) return 'list';
      return r;
    } catch { return 'list'; }
  });
  const [seriesId, setSeriesId] = React.useState(() => {
    try { return localStorage.getItem('dp.seriesId') || null; } catch { return null; }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('dp.route', route);
      if (seriesId) localStorage.setItem('dp.seriesId', seriesId);
    } catch {}
  }, [route, seriesId]);

  const openSeries = (id) => { setSeriesId(id); setRoute('feed'); };
  const openDetail = (id) => { setSeriesId(id); setRoute('series'); };
  const backToList = () => { setRoute('list'); };

  // Listen for back button from PlayerChrome
  React.useEffect(() => {
    const handler = () => backToList();
    window.addEventListener('dp:back-to-list', handler);
    return () => window.removeEventListener('dp:back-to-list', handler);
  }, []);

  const isDark = route === 'feed';

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: isDark ? '#0F0E0D' : 'var(--paper)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', transition: 'background 200ms',
    }}>
      {/* Desktop side rail decor */}
      {isDark && (
        <>
          <SideRail side="left"/>
          <SideRail side="right"/>
        </>
      )}

      {/* Phone frame */}
      <div style={{
        position: 'relative',
        width: 'min(420px, calc(100vh * 9 / 16 - 40px))',
        height: 'min(92vh, 820px)',
        minHeight: 560,
        borderRadius: 32,
        overflow: 'hidden',
        boxShadow: isDark
          ? '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(250,247,242,0.08)'
          : '0 30px 80px rgba(15,14,13,0.18), 0 0 0 1px var(--ink-10)',
        background: isDark ? '#0F0E0D' : 'var(--paper)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {route === 'list' && <List onOpenSeries={openSeries} />}
          {route === 'feed' && <Feed seriesId={seriesId} onOpenSeries={openDetail} />}
          {route === 'series' && <SeriesDetail seriesId={seriesId} onBack={backToList} />}
          {route === 'liked' && <Liked onOpenSeries={openSeries} />}
          {route === 'profile' && <Profile />}
        </div>
      </div>
    </div>
  );
}

function SideRail({ side }) {
  return (
    <div style={{
      position: 'absolute', [side]: '6%', top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(250,247,242,0.35)',
      fontFamily: 'Geist Mono, monospace', fontSize: 11,
      letterSpacing: '0.2em', writingMode: 'vertical-rl',
      display: window.innerWidth > 900 ? 'block' : 'none',
    }}>
      {side === 'left' ? 'DRAMA PANN · 한 입씩 먹는 드라마' : '2026 · VERTICAL CINEMA'}
    </div>
  );
}

window.App = App;
