function ProgressBar({ value = 0, total = 100, thick = false }) {
  const pct = Math.max(0, Math.min(100, (value / total) * 100));
  return (
    <div style={{
      height: thick ? 6 : 3, background: 'rgba(250,247,242,0.2)',
      borderRadius: 9999, overflow: 'hidden',
    }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: '#E63946', borderRadius: 9999,
        transition: 'width 200ms linear',
      }}/>
    </div>
  );
}
window.ProgressBar = ProgressBar;
