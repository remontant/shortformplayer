function TopBar({ title, onBack }) {
  return (
    <div style={{
      height: 56, display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 16px', borderBottom: '1px solid var(--ink-10)',
      background: 'var(--paper)',
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 9999, background: 'transparent',
          border: 'none', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: 'var(--ink)',
        }}><Icon.ChevronLeft size={22}/></button>
      )}
      <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
    </div>
  );
}
window.TopBar = TopBar;
