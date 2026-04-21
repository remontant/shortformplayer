// Lucide-style icons, hand-ported so no CDN dependency at runtime.
// Stroke 1.75, round caps/joins.

const baseProps = {
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round',
};
const sized = (size) => ({ ...baseProps, width: size, height: size });

const Icon = {
  Play: (p = {}) => <svg {...sized(p.size||24)}><polygon points="6 3 20 12 6 21 6 3" fill={p.fill||'none'}/></svg>,
  Pause: (p = {}) => <svg {...sized(p.size||24)}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  Heart: (p = {}) => <svg {...sized(p.size||24)} fill={p.filled? 'currentColor':'none'}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Bookmark: (p = {}) => <svg {...sized(p.size||24)}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>,
  Share: (p = {}) => <svg {...sized(p.size||24)}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  Mute: (p = {}) => <svg {...sized(p.size||24)}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>,
  Volume: (p = {}) => <svg {...sized(p.size||24)}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
  Search: (p = {}) => <svg {...sized(p.size||24)}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  User: (p = {}) => <svg {...sized(p.size||24)}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ChevronLeft: (p = {}) => <svg {...sized(p.size||24)}><polyline points="15 18 9 12 15 6"/></svg>,
  ChevronDown: (p = {}) => <svg {...sized(p.size||24)}><polyline points="6 9 12 15 18 9"/></svg>,
  ChevronUp: (p = {}) => <svg {...sized(p.size||24)}><polyline points="18 15 12 9 6 15"/></svg>,
  List: (p = {}) => <svg {...sized(p.size||24)}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  More: (p = {}) => <svg {...sized(p.size||24)}><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>,
  Home: (p = {}) => <svg {...sized(p.size||24)}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
};

window.Icon = Icon;
