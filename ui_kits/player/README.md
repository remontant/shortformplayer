# Plot Player — UI Kit

Web app UI kit for the Plot short-form drama player.

## Screens (click-thru in `index.html`)

1. **Home / Feed** — vertical player carries the home. Swipe down for next series, up for prev. Currently playing is always full-viewport height.
2. **Series Detail** — all episodes of a drama. Poster hero + episode grid.
3. **Liked** — saved episodes. Minimal grid.
4. **Profile** (light placeholder) — nickname, preferences.

## Structure

```
ui_kits/player/
├── README.md
├── index.html            ← mounts the app; click-thru prototype
├── App.jsx               ← router + global state
├── screens/
│   ├── Feed.jsx          ← vertical scroll-snap player
│   ├── SeriesDetail.jsx
│   ├── Liked.jsx
│   └── Profile.jsx
└── components/
    ├── Player.jsx        ← single episode: video/poster + overlay chrome
    ├── PlayerChrome.jsx  ← top wordmark, episode capsule, bottom meta
    ├── LikeButton.jsx
    ├── ProgressBar.jsx
    ├── EpisodeBadge.jsx
    ├── SeriesCard.jsx
    ├── TopBar.jsx
    └── BottomNav.jsx
```

## Signature

The player is **always vertical 9:16**, centered on desktop with paper-colored side rails. On mobile it fills 100vh. Protection gradients top & bottom carry the UI — no capsule backgrounds behind titles.

Swipe down/up between episodes. Side swipe (or bottom nav) to go to Series Detail or Liked.

## Caveats

- Video is **simulated** — poster + a fake progress timer.
- No backend — liked state in `localStorage`.
- Drama posters are placeholder SVG gradients.
