# Handoff: Drama Pann — Shortform Vertical Drama Player

## Overview

Drama Pann (드라마 판) is a vertical shortform drama platform — think YouTube Shorts for serialized Korean drama. Users land on a list page showing 4 featured dramas, tap one, and enter a full-screen vertical player where each episode is a ~90-second vertical video. Swipe up → next episode, tap → pause/play, heart → save.

Brand tone: playful, witty, "한 입씩 먹는 드라마" (drama you eat one bite at a time). Light-mode product surface with a dark full-bleed player.

## About the Design Files

**The files in this bundle are design references created in HTML** — React-via-Babel prototypes showing intended look and behavior. They are **not production code** to copy wholesale. Your task is to **recreate these designs in the target codebase's existing environment** (Next.js, Remix, native mobile, etc.) using its established patterns, component libraries, and state management.

If no codebase exists yet, pick the most appropriate framework (Next.js App Router + React, or React Native for mobile-first) and implement from scratch.

## Fidelity

**High-fidelity (hifi).** Colors, typography, spacing, layout, and interaction timing are final. Recreate pixel-perfectly using the target codebase's component primitives. The illustrative SVG posters/stills are placeholders — swap for real video/poster assets in production.

## Screens / Views

### 1. List (Landing) — `ui_kits/player/screens/List.jsx`

**Purpose**: Entry point. User browses 4 dramas and taps into one to start watching.

**Layout** (420×820 phone frame, scrollable):
- **Sticky header** (paper bg, 22px/20px padding, 1px bottom border `--ink-6`): Wordmark "Drama**Pann**" (Pann in `--plot-red`) at 22px/700. Search icon button (38×38 round) on right.
- **Section label** "NOW PLAYING" — Geist Mono 11px, uppercase, `0.18em` letter-spacing, `--ink-60`.
- **Featured card** (full-width minus 20px padding, `aspect-ratio: 4/5`, `border-radius: 20px`):
  - Poster `<img>` cover-fit background
  - Bottom gradient overlay: `linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.25) 55%, transparent)`, height 62%
  - Top-left genre chip: glass-morphic pill (`rgba(250,247,242,0.16)` bg, blur 10px, 5×10px padding, Geist Mono 10px uppercase)
  - Bottom stack: title (26px/700/-0.02em), tagline (13px/1.45/82% white), CTA button
  - CTA: Pill `background: #FAF7F2`, ink text, Play icon (14px) + "EP1부터 보기" + divider + "{released}/{totalEp} EP" in Geist Mono 11px
- **"ALL SERIES · N"** label (same style as NOW PLAYING)
- **List rows** for remaining dramas (button, 14px vertical padding, 1px bottom border between):
  - Rank number (02, 03, 04 — Geist Mono 13px/600, `--ink-40`, tabular-nums)
  - Poster thumb 64×84px, `border-radius: 10`, 1px ring
  - Meta column: title (16px/600), tagline (12.5px/`--ink-60`, 2-line clamp, `word-break: keep-all`), genre · "S{n} · {released}/{totalEp} EP"
  - Play glyph: 36×36 round, `--plot-red` bg, white Play icon
- Footer: "한 입씩 먹는 드라마 · DRAMA PANN" (Geist Mono 10px, `0.2em` letter-spacing, centered)

### 2. Player Feed — `ui_kits/player/screens/Feed.jsx` + `components/Player.jsx`

**Purpose**: Full-screen vertical player scoped to one series. Scroll-snap on y-axis; each slot is one episode.

**Layout**:
- Container: `overflow: auto; scroll-snap-type: y mandatory; scroll-behavior: smooth; background: #0F0E0D`
- Each child: full phone-frame height, `scroll-snap-align: start; scroll-snap-stop: always`
- First slot first-load: small animated hint at bottom ("↑ 다음 에피소드", Geist Mono 11px, 2.4s pulse keyframe fading in/out)

**Player slot** (one episode):
- Background: scene stills cross-fade as `progress` advances. 3 stills per series; `stillIdx = floor((progress/duration) * stills.length)`. `transition: opacity 700ms cubic-bezier(0.22,1,0.36,1)`. Poster image is always in the stack as z-index:-1 safety net.
- **Dimming when paused**: `filter: brightness(0.7)`.
- **PlayerChrome** (absolute overlays) — see `components/PlayerChrome.jsx`:
  - Top protection gradient: 28% height, `linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)`
  - Bottom protection gradient: 38% height, `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2) 60%, transparent)`
  - **Top bar** (22px top / 20px side padding):
    - Left: back button (38×38 glass round, `rgba(15,14,13,0.35)` bg, blur 10, chevron-left icon) + Wordmark (18px/700, white, Pann in `#E63946`)
    - Right: `<EpisodeBadge>` — capsule "S1 · EP04" (`components/EpisodeBadge.jsx`)
    - Back button dispatches `window.dispatchEvent(new CustomEvent('dp:back-to-list'))`
  - **Bottom meta** (18px sides, 20px bottom):
    - Series title (22px/600, white, tappable → opens SeriesDetail)
    - `EP04 · {epTitle}` (Geist Mono 11px, 72% white)
    - `<ProgressBar>`: 2px track `rgba(250,247,242,0.18)` + red fill, 9999 radius
    - Time stamps: `{elapsed}` / `{total}` (Geist Mono 10px, 55% white, tabular-nums)
- **Right rail actions** (absolute right:14, bottom:130, z:4, gap:14):
  - `<LikeButton>` 52px, heart icon, fills on tap, persists to `localStorage['plot.liked']`
  - Share button (46×46 glass round)
  - Episode list button (46×46 glass round) — opens SeriesDetail
- **Tap-to-pause**: clicking the video (outside `[data-noprop]`) toggles `paused`. When paused: 80×80 glass round with Play icon centered.

### 3. Coming Soon — `ui_kits/player/screens/ComingSoon.jsx`

**Purpose**: After scrolling past the last released episode (EP05 of 20), user lands here.

**Layout**:
- Full-bleed blurred poster (`filter: blur(40px) brightness(0.35); transform: scale(1.15)`) + dark gradient overlay
- Centered content (max-width 320px):
  - Poster thumb 120×160, `border-radius: 14`, shadow
  - Pill badge: pulsing red dot + "COMING SOON" (Geist Mono 10.5px, `0.16em` letter-spacing, `rgba(230,57,70,0.18)` bg + border `rgba(230,57,70,0.45)`)
  - Headline: "EP06는 준비 중이에요" (24px/700)
  - Body: "「{title}」는 현재 {released}화까지 공개되었어요." + "다음 이야기는 곧 찾아옵니다." (14px/1.55)
  - Progress bar with count "5/20"
  - CTA: "공개 알림 받기" (white pill) + "다른 드라마 보기" (ghost pill) — latter dispatches `dp:back-to-list`

### 4. Series Detail — `ui_kits/player/screens/SeriesDetail.jsx`

**Purpose**: Full episode list for a drama (20 slots, 5 released + 15 locked).

**Layout**:
- Hero: poster with `aspect-ratio: 9/12`, paper-colored bottom gradient fade, back button top-left
- Meta block: genre pill (plot-red), title (32px/600/-0.025em), tagline (15px, fg-2), "S1 · 20 EP · 평균 1:40" (Geist Mono 12px)
- Primary CTA: "다음 편 보기 · EP01" (full-width, `--plot-red`)
- Secondary: "처음부터 보기" ghost button
- Episode list: descending (EP20 → EP01). Released eps show title + duration; unreleased show "공개 예정" at 0.4 opacity.

### 5. Liked / Profile

Saved episodes (grid) and profile screen exist but are not currently routed-to from the running app (no bottom nav). Keep the components but treat as future work.

## Interactions & Behavior

- **Routing** (`App.jsx`): state-machine with `list | feed | series | liked | profile`. Persists to `localStorage['dp.route']` and `['dp.seriesId']`. Safety: if route is `feed`/`series` on reload but no seriesId, falls back to `list`.
- **Back from player**: `dp:back-to-list` custom event → `setRoute('list')`.
- **Feed is per-series**: `getFeedFor(seriesId)` returns that drama's released episodes + a trailing `comingSoon: true` slot if `episodes.length < totalEp`.
- **Player progress**: fake timer at `+0.3s` per 120ms tick (for prototype; replace with real `<video>` element's `timeupdate`). Loops at end.
- **Scene stills cross-fade**: tied to `progress/duration`.
- **Likes**: `localStorage['plot.liked']` as JSON array of entry ids `${seriesId}-${ep}`.

## State Management

- **Global** (App): `route`, `seriesId`
- **Feed**: current `idx` (scroll-snap based)
- **Player**: `progress`, `paused`
- **Likes**: plain localStorage array — in production replace with server-backed user state
- **Events**: `dp:back-to-list`, `dp:notify` (coming-soon notify subscription stub)

## Design Tokens

Full token spec in `colors_and_type.css`. Key values:

**Colors**
- `--paper: #FAF7F2` (app bg)
- `--ink: #0F0E0D` (primary text / dark surfaces)
- `--plot-red: #E63946` (brand accent — used sparingly: wordmark "Pann", genre chip, primary CTA, play glyph)
- `--plot-red-hover: #D12E3A`
- Ink alphas: `--ink-60/40/20/10/6` for text hierarchy and borders
- Semantic: `--success #2E8B4F`, `--warn #E89612`, `--error #D84848`

**Typography**
- Display/body: **Geist** (400/500/600/700) + **Pretendard** as Korean fallback
- Mono: **Geist Mono** (metadata, time stamps, labels)
- Scale: 32 (h1) / 26 (hero title) / 22 (wordmark, series title in player) / 18 (BI) / 16 (row title) / 15 (body) / 14 (CTA) / 13 (body 2) / 12.5 (row subtitle) / 11 (labels) / 10–10.5 (mono meta)
- Letter-spacing: display `-0.02em`, BI `0.02em`, mono labels `0.06–0.2em`

**Spacing**
- Base 4. Common steps: 4, 8, 10, 12, 14, 16, 18, 20, 28, 32
- Screen padding: 20px sides (scroll content), 22px top for headers

**Radius**
- `--r-sm: 8`, `--r-md: 12`, `--r-lg: 20` (cards), `9999` (pills/buttons)

**Shadow**
- Hero cards: `0 12px 32px rgba(15,14,13,0.20), 0 0 0 1px var(--ink-10)`
- Phone frame (dark route): `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(250,247,242,0.08)`

**Motion**
- Scene fade: `700ms cubic-bezier(0.22,1,0.36,1)`
- Pause state filter: `200ms`
- Button press: `transform: scale(0.92)` in 80ms
- Coming-soon pulse: 1600ms ease-in-out infinite (opacity 0.4 ↔ 1)

## Assets

- **Logo/wordmark** (`assets/logo.svg`, `logo-mark.svg`, `wordmark.svg`, `favicon.svg`): clapperboard + play-triangle mark. "Drama" in ink, "Pann" in plot-red. **Replace with final illustrator-produced mark for production.**
- **Posters** (`assets/posters/*.svg`): 5 illustrative 9:16 tall SVG posters. **Placeholders** — swap for real poster artwork.
- **Stills** (`assets/stills/*.svg`): 3 per series, 540×960 flat-color scene placeholders. **Placeholders** — swap for real video frames or live `<video>` streams.
- **Icons** (`ui_kits/player/components/Icons.jsx`): hand-ported Lucide subset (Play, Pause, Heart, Bookmark, Share, ChevronLeft, List, Search, etc.). Recommend adopting `lucide-react` package in production.
- **Fonts**: Geist + Geist Mono via GitHub release (see `colors_and_type.css` `@font-face`). Pretendard via CDN. In production, self-host or use `next/font`.

## Files

```
design_handoff_drama_pann/
├── README.md                 ← you are here
├── DESIGN_SYSTEM.md          ← full brand + system documentation (content fundamentals, voice, layout rules)
├── colors_and_type.css       ← authoritative design tokens
├── ui_kits/player/           ← the prototype. Components split by concern:
│   ├── index.html            ← entry, loads all .jsx via Babel
│   ├── App.jsx               ← router + phone-frame shell
│   ├── screens/              ← List, Feed, ComingSoon, SeriesDetail, Liked, Profile
│   └── components/           ← Player, PlayerChrome, LikeButton, ProgressBar, SeriesCard,
│                               EpisodeBadge, TopBar, BottomNav, Icons, data
├── preview/                  ← 23 one-off design-system cards (color swatches, type specimens,
│                               component states) — reference only, don't port these verbatim
└── assets/                   ← logo, posters, stills, favicon
```

## Recommended implementation order

1. **Tokens first** — port `colors_and_type.css` to the target system (CSS vars, Tailwind config, styled-system theme, etc.).
2. **Primitives** — Icon set, Button/Pill, ProgressBar, EpisodeBadge.
3. **List page** — easiest to validate type/spacing/color.
4. **Player** — replace the fake timer with a real `<video>` element; hook `timeupdate` to `progress`; keep the chrome/rail layout intact.
5. **Feed scroll-snap** — preserve `scroll-snap-type: y mandatory; scroll-snap-stop: always`. On mobile, also handle viewport height issues (`100dvh`).
6. **Coming Soon** as a feed slot, not a separate route.
7. **SeriesDetail** last.

## Open questions for product

- Real content pipeline: where do videos live? CDN? DRM?
- Auth / saved likes — server-side sync strategy
- Additional screens beyond the 4 here (search results, categories, player settings, subtitles toggle)
- Bottom nav vs. pure back-navigation (current prototype removed it per feedback)
