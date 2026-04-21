function BottomNav({ route, setRoute }) {
  const items = [
    { id: 'feed',    label: '홈',     icon: Icon.Home },
    { id: 'liked',   label: '저장',   icon: Icon.Bookmark },
    { id: 'profile', label: '나',     icon: Icon.User },
  ];
  const isDark = route === 'feed';
  return (
    <div style={{
      height: 60, display: 'flex',
      borderTop: `1px solid ${isDark ? 'rgba(250,247,242,0.1)' : 'var(--ink-10)'}`,
      background: isDark ? 'rgba(15,14,13,0.9)' : 'var(--paper)',
      backdropFilter: isDark ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: isDark ? 'blur(16px)' : 'none',
    }}>
      {items.map(it => {
        const active = it.id === route || (it.id === 'feed' && route === 'series');
        const IconEl = it.icon;
        const color = active
          ? (isDark ? '#FAF7F2' : 'var(--ink)')
          : (isDark ? 'rgba(250,247,242,0.5)' : 'var(--fg-3)');
        return (
          <button key={it.id} onClick={() => setRoute(it.id)} style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 2, color,
            transition: 'color 150ms',
          }}>
            <IconEl size={22} />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
window.BottomNav = BottomNav;
