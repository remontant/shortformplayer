# Drama Pann Design System

> 한 입씩 먹는 드라마. 숏폼 드라마 플레이어 "Drama Pann"의 디자인 시스템입니다.

## 제품 개요

**Plot**은 세로형 숏폼 드라마 전용 플레이어입니다. 유튜브 쇼츠처럼 스와이프로 다음 클립을 보지만, 각 클립은 **하나의 드라마의 한 회차**입니다. 사용자는 출퇴근길·엘리베이터·자기 전 5분 동안 드라마 한 회차(보통 60~90초)를 즐깁니다.

### 핵심 경험
- **세로 100% 풀스크린 플레이어** — 모든 디바이스에서 세로 꽉 채움
- **댓글/DM 없음** — 감상에만 집중. 좋아요만 가능
- **최소한의 UI**: 드라마 제목 / 현재 회차 정보 / 프로그레스 바 / 좋아요
- **세로 스와이프** — 위아래로 이동하면 같은 드라마의 이전/다음 회차, 옆으로는 다른 드라마 시리즈

### 제품 표면
- **Web app** (이번 프로젝트 범위)
  - Home / Feed (세로 플레이어가 그 자체로 홈)
  - Series Detail (시리즈의 모든 회차)
  - Liked (내가 좋아한 클립)
  - Minimal 프로필

## 브랜드 한 줄

> **"한 입씩 먹는 드라마."**

## 자료 소스

이 프로젝트는 **새로 발명된 브랜드**입니다. 참고 자료 없이 `community` / 숏폼 드라마 플레이어 컨셉에서 출발했습니다.

- 사용자 제공: 기획 방향 (숏폼 드라마 플레이어, 세로 풀스크린, 좋아요만, 제목+회차+프로그레스바)
- 톤: Playful, witty
- 타이포 방향: Clean modern sans (Geist 계열)
- 컬러 방향: Light mode 기반 + 플레이어 전용 다크 캔버스

---

## CONTENT FUNDAMENTALS

Drama Pann의 카피는 **짧고, 위트 있고, 친구같고, 한국어 구어체가 기본**입니다. 한영 혼용 브랜드이지만 주 사용자는 한국어권이라 한국어 우선, 영어는 보조.

### 1. Voice (목소리)

- **친구 같지만 너무 들이대지는 않음.** 편안하게 반말로 말하지 않고, "~해요" 톤을 기본으로.
- **위트**: 드라마 세계관을 살짝 이용한 농담. "이 에피 안 보면 다음 편 못 봐요 😉" 보다는 "스포일러는 드라마가 할게요."
- **과장 금지**: "최고의", "혁신적인" 같은 말 없음. 그냥 보여주기.

### 2. Grammar / Casing

- **한국어**: "~해요" / "~습니다" 섞어 씀. 버튼/CTA는 "~하기" 형태 ("저장하기", "다음 편 보기").
- **영어**: Sentence case. Title Case 금지. "Up next", "Saved". "UP NEXT" 같은 ALL CAPS는 태그·메타데이터에서만 가끔.
- **Title Case, 과장된 마케팅 문구 X**

### 3. 1인칭/2인칭

- **"너" 금지**, **"당신"은 가급적 안 씀**.
- 기본은 주어 생략, 필요하면 **"나"의 플레이리스트** 같은 소유 표현으로.
  - "내 저장함" ✅
  - "당신의 저장함" ❌
  - "너의 저장함" ❌

### 4. Emoji

- **거의 안 씀.** 플레이풀한 브랜드지만 이모지로 귀여움을 만들지 않음.
- 예외: 빈 상태(empty state)에서 아주 드물게 1개만. "아직 아무것도 없어요 🎬" 같이 의미 있는 한 개.

### 5. 숫자/회차 표기

- 회차는 **"EP 01"** 형식. "1화" 또는 "1편"도 맥락상 허용.
- 시즌은 **"S1"**, 시즌+회차는 **"S1·EP04"** (가운뎃점 · 사용).
- 시간은 **"2:04"** 또는 **"0:42"**. "42초" 같은 자연어는 안 씀.

### 6. 예시 (Copy snippets)

| 상황 | Good | Bad |
|---|---|---|
| 로딩 | `불러오는 중…` | `잠시만 기다려주세요 😊` |
| 에러 | `어디선가 연결이 끊겼어요. 다시 해볼까요?` | `오류가 발생했습니다. 네트워크를 확인해주세요.` |
| 빈 저장함 | `아직 저장한 회차가 없어요. 맘에 드는 장면에서 ♡ 눌러보세요.` | `저장된 콘텐츠가 없습니다.` |
| 회차 종료 | `다음 편으로 이어집니다` | `Continue to the next episode` |
| 좋아요 후 | `저장했어요` | `좋아요!` (느낌표 금지) |
| 업데이트 안내 | `새로운 시즌이 올라왔어요.` | `🎉 신규 시즌 출시!!` |
| CTA 버튼 | `다음 편 보기` / `처음부터 보기` | `지금 시청하기` / `START WATCHING` |

### 7. 드라마 메타 (카피 스타일)

시리즈 제목은 **원문 그대로**. 부제·설명은 **한 줄**로 끝냄.

> **열 번째 소개팅**  
> *8 episodes · 로맨스 · 2분 내외*  
> 매번 실패하는데도 왜 또 나가는 걸까.

---

## VISUAL FOUNDATIONS

Drama Pann의 시각 언어는 **극장의 검정 + 부드러운 off-white의 대비**에서 출발합니다. 플레이어는 몰입을 위한 검정, 나머지 UI(피드 외 화면)는 따뜻한 베이지-화이트 배경. 레드 액센트 한 가지만 일관되게 사용.

### Color

- **Paper** (`#FAF7F2`) — light mode 메인 배경. 순백이 아니라 살짝 따뜻한 off-white. 종이 느낌.
- **Ink** (`#0F0E0D`) — 텍스트와 플레이어 배경. 순검정 아닌 갈색 기운이 아주 살짝.
- **Pann Red** (`#E63946`) — 유일한 브랜드 액센트. 좋아요 active, CTA 버튼, 플레이 중 프로그레스. 절제해서 사용.
- **Neutral scale** — 흑→백 사이 따뜻한 회색 8단계.
- **Semantic**: success/warning/danger 최소한으로만 정의.

다크모드는 플레이어 화면에서 **자연스럽게 등장** (콘텐츠가 검정 캔버스이므로). 별도 다크모드 토글 없음. Light mode가 기본.

### Type

- **Geist Sans** — 모든 UI 본문/헤더. 깔끔한 modern sans. 한국어는 **Pretendard**로 자동 fallback.
- **Geist Mono** — 회차 번호, 타임코드, 메타데이터. "S1·EP04", "2:04" 같은 고정폭이 필요한 곳.
- 글꼴 가중치: Regular (400), Medium (500), Semibold (600). Bold는 display에서만.
- Display: 48~72px, Semibold, tight tracking (-0.02em).
- Body: 16px, Regular.
- Caption/mono: 12~13px.

### Spacing

- 4px 베이스 ramp: `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- 플레이어 UI overlay는 safe area + 16px 패딩 기본.

### Backgrounds

- **Paper 색 단색** — 그라데이션 없음. 텍스쳐 없음. 종이의 평범함이 정체성.
- **플레이어**는 순검정 캔버스 + 위에 **세로 protection gradient** (상하 둘 다, 높이 25%, `rgba(0,0,0,0.7) → transparent`).
- 일러스트/패턴 **없음**. 브랜드의 시각 자산은 **드라마 포스터 썸네일 그 자체**.

### Imagery

- 드라마 썸네일은 **세로 9:16 비율**. 시네마틱, 영화 스틸컷 스타일.
- 톤: 다양한 장르 담지만 **포스터 프레임에 Drama Pann 워터마크(상단 좌측, 8% opacity)**로 일관성 확보.
- 사용자 제공 이미지 없음 → 일단 placeholder (컬러 그라디언트 + 제목) 사용.

### Animation

- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint 계열). 빠르게 나타나고 천천히 정착.
- **Duration**: 150ms (마이크로 인터랙션), 250ms (패널/뷰 전환), 400ms (스와이프 물리).
- 좋아요 하트: **pop scale** (0.8 → 1.2 → 1.0, 300ms, spring).
- 바운스/튀는 애니메이션은 **좋아요 인터랙션 한정**. 나머지는 차분한 fade/slide.
- Page transition: 새 회차 로드 시 fade-black 120ms.

### Hover states

- **Interactive text**: opacity `0.7` → `1.0` (hover 시 full opacity로).
- **Button primary**: `bg brightness-110` (살짝 밝아짐).
- **Button ghost**: `bg-ink/5` 등장.
- 커서는 명시적으로 pointer.

### Press states

- **Scale 0.96**, 80ms. 모든 버튼.
- 좋아요 버튼은 scale 0.9까지 더 들어갔다가 튀어오름.

### Borders

- 1px, **`ink/10`** (= `rgba(15, 14, 13, 0.1)`). 대비 약하게.
- 강조 필요 시 `ink/20`.

### Shadow system

4단계 elevation:
- **e1** — 카드 휴면: `0 1px 2px rgba(15,14,13,0.04)`
- **e2** — 카드 호버: `0 4px 12px rgba(15,14,13,0.08)`
- **e3** — 모달: `0 20px 48px rgba(15,14,13,0.16)`
- **e4** — 플레이어 UI 플로팅: `0 8px 32px rgba(0,0,0,0.4)` (다크 캔버스 위)

Inner shadow는 **썸네일 내부 글자 읽기용 gradient overlay**로만 존재. UI 컴포넌트에는 안 씀.

### Protection gradients vs capsules

- 플레이어에서 글자를 배경 위에 띄울 때: **capsule(필 배경) 대신 protection gradient**. 이유: 몰입 방해 최소화. 캡슐은 CTA 버튼 하나 정도.
- 예외: 상단 우측 "EP 03" 같은 지속적 뱃지는 반투명 캡슐 사용 (`ink/40 + backdrop-blur-md`).

### Corner radii

- `sm` **6px** — 뱃지, 작은 인풋
- `md` **10px** — 버튼, 카드
- `lg` **16px** — 큰 카드, 모달, 썸네일
- `xl` **24px** — hero/시리즈 포스터
- `full` — 좋아요 버튼, 아바타

### Cards

- **Paper 배경, border 1px ink/10, radius md~lg, shadow e1**. 호버 시 e2로 상승 (translateY -2px).
- 플레이어 내부 카드(Up Next 등)는 **ink/80 + backdrop-blur + border ink/20 inverted**로.

### Transparency & Blur

- **Backdrop blur**는 **플레이어 overlay UI에만 사용** (16~24px blur). Paper UI에는 blur 안 씀 — 종이의 깨끗함을 유지.
- 반투명은 `ink/40` (플레이어 캡슐), `paper/80` (hover overlay) 등 정해진 단계에서만.

### Layout rules

- 모바일은 세로 풀스크린이 기본. 데스크탑도 **중앙 세로 9:16 프레임** + 양 옆은 paper 배경. 이것이 Drama Pann의 시그니처.
- 데스크탑 플레이어는 max-height 90vh, 양옆에 side info panel (시리즈 정보/up next).

### Iconography

👉 ICONOGRAPHY 섹션 참조.

---

## ICONOGRAPHY

Drama Pann은 **[Lucide Icons](https://lucide.dev)** 를 기본 아이콘 시스템으로 사용합니다 (CDN 링크).

### 선택 이유

- 스트로크 스타일 (outline), 1.75px weight — Geist의 느낌과 잘 맞음
- 둥근 선 끝 (round linecap) — Drama Pann의 친근한 톤과 일치
- 무료 MIT 라이선스, 활발히 업데이트
- 풍부한 미디어/플레이어 아이콘 (play, pause, heart, shuffle, skip)

### 사용 규칙

- **Stroke width**: 1.75px 고정 (Lucide 기본). 작은 크기(12~14px)에서는 2px로 올려도 됨.
- **크기**: 16 / 20 / 24 / 32px. 다른 크기 사용 자제.
- **색**: currentColor — 부모 요소에서 상속.
- **Active 상태 heart**: Lucide `heart` + fill Pann Red (`<Heart fill="#E63946" stroke="#E63946" />`).

### 주요 아이콘 매핑

| 용도 | Lucide name |
|---|---|
| 좋아요 | `Heart` |
| 저장 | `Bookmark` |
| 공유 | `Share2` |
| 재생 | `Play` |
| 일시정지 | `Pause` |
| 음소거 | `VolumeX` / `Volume2` |
| 다음 회차 | `ChevronDown` |
| 시리즈 정보 | `Info` / `List` |
| 검색 | `Search` |
| 프로필 | `User` |
| 뒤로 | `ChevronLeft` |
| 더보기 | `MoreVertical` |

### 커스텀 아이콘

**Plot 로고 마크** 하나만 커스텀. 나머지는 모두 Lucide. 로고 마크는 재생 삼각형 + 물방울 형태의 복합 도형 (assets/logo.svg 참조).

### Emoji / 유니코드 사용

- **UI에서 emoji 사용 안 함**. 단, 빈 상태 일러스트 대체 용도로 1개만 드물게.
- 유니코드 `·` (middle dot, U+00B7)는 메타데이터 구분자로 적극 사용: "S1·EP04".

---

## 파일 인덱스 / Manifest

```
/
├── README.md                  ← 이 파일. 모든 디자인 원칙의 출발점.
├── SKILL.md                   ← Claude Code / 에이전트용 skill 정의
├── colors_and_type.css        ← CSS 변수 (색상, 타입, 스페이싱)
├── fonts/                     ← Geist Sans/Mono, Pretendard (webfonts)
├── assets/                    ← 로고, 플레이스홀더 이미지, 커스텀 아이콘
│   ├── logo.svg
│   ├── logo-mark.svg
│   ├── wordmark.svg
│   └── posters/              ← 샘플 드라마 포스터 (placeholder)
├── preview/                   ← Design System 탭에 표시될 카드 HTML들
│   ├── colors-*.html
│   ├── type-*.html
│   ├── spacing-*.html
│   ├── components-*.html
│   └── brand-*.html
└── ui_kits/
    └── player/
        ├── README.md
        ├── index.html         ← 클릭 쓰루 프로토타입 (Feed/Player/Detail/Liked)
        ├── Player.jsx
        ├── Feed.jsx
        ├── SeriesDetail.jsx
        ├── Liked.jsx
        └── components/
            ├── LikeButton.jsx
            ├── ProgressBar.jsx
            ├── EpisodeBadge.jsx
            └── ...
```

---

## Caveats

- **로고와 모든 assets는 placeholder** 입니다. 실제 브랜드 자산이 없어 재생 삼각형 + 물방울 형태로 새로 만들었습니다.
- **드라마 포스터 이미지 없음** → 그라디언트 + 제목 오버레이로 placeholder 생성.
- **Geist 폰트는 CDN** 에서 로드합니다 (Vercel 제공). 로컬 폰트 파일 없이 동작.
- **Pretendard fallback** — 한국어 글꼴은 Pretendard를 CDN에서 로드.
- 이 브랜드는 **이번 세션에서 새로 발명** 되었으므로, 사용자가 선호하는 방향이 다르면 얼마든지 조정 가능.
