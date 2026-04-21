// Like button with pop animation + localStorage persistence.
function LikeButton({ id, size = 48 }) {
  const [liked, setLiked] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('plot.liked') || '[]').includes(id); } catch { return false; }
  });
  const [popKey, setPopKey] = React.useState(0);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    setPopKey(k => k + 1);
    try {
      const arr = JSON.parse(localStorage.getItem('plot.liked') || '[]');
      const set = new Set(arr);
      if (next) set.add(id); else set.delete(id);
      localStorage.setItem('plot.liked', JSON.stringify([...set]));
    } catch {}
  };

  const style = {
    width: size, height: size, borderRadius: 9999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: liked ? 'rgba(230,57,70,0.14)' : 'rgba(250,247,242,0.10)',
    border: `1px solid ${liked ? 'rgba(230,57,70,0.35)' : 'rgba(250,247,242,0.20)'}`,
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    color: liked ? '#E63946' : '#FAF7F2',
    cursor: 'pointer',
    transition: 'transform 80ms cubic-bezier(0.22,1,0.36,1), background 150ms, border-color 150ms, color 150ms',
  };

  return (
    <button key={popKey} style={style} onClick={toggle} className={liked ? 'plot-like active' : 'plot-like'}>
      <style>{`
        .plot-like:active { transform: scale(0.9); }
        .plot-like.active { animation: plotLikePop 320ms cubic-bezier(0.22,1,0.36,1); }
        @keyframes plotLikePop { 0% { transform: scale(0.85);} 50% { transform: scale(1.18);} 100% { transform: scale(1);} }
      `}</style>
      <Icon.Heart size={Math.round(size * 0.46)} filled={liked} />
    </button>
  );
}
window.LikeButton = LikeButton;
