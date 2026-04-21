# Drama Pann (드라마 판) - Shortform Vertical Drama Player

> "한 입씩 먹는 드라마"

Drama Pann은 유튜브 쇼츠나 틱톡처럼 세로형 숏폼 포맷으로 제작된 시리즈형 한국 드라마를 감상할 수 있는 플랫폼 프로토타입(PoC)입니다. 

## 🚀 프로젝트 개요
- **목적:** 숏폼 세로형 비디오 플레이어 및 피드 전환 UX 검증
- **주요 기능:**
  - 홈 화면(List): 추천 드라마 및 전체 드라마 목록 제공
  - 플레이어(Feed): 100% 뷰포트 크기의 숏폼 비디오 플레이어
  - 스와이프 UX: 터치(모바일) 및 휠(PC)을 통한 매끄러운 상하 스와이프 에피소드 전환
  - 좋아요(Save), 에피소드 목록(Series Detail) 조회 기능
  - 자동 재생 및 에피소드 연속 재생

## 🛠 기술 스택
- **Framework:** Next.js 14 (App Router)
- **Library:** React 18
- **Styling:** Vanilla CSS (CSS Variables 기반 디자인 시스템)
- **Icons:** Lucide-React
- **Language:** TypeScript

## 📂 폴더 구조 (src/ 기반)
본 프로젝트는 모노레포 형태의 디렉토리 구조를 가지며, 실제 구동되는 어플리케이션 코드는 `web/src/` 내부에 위치합니다.

```text
drama_pann/
├── web/                     # Next.js 어플리케이션 루트
│   ├── src/
│   │   ├── app/             # Next.js App Router (페이지 및 레이아웃)
│   │   ├── components/      # UI 컴포넌트 (플레이어, 리스트, 아이콘 등)
│   │   └── lib/             # 더미 데이터 및 유틸리티 함수 (data.ts)
│   └── public/              # 정적 에셋 (videos, assets)
├── assets/                  # 디자인 원본 에셋 (포스터, 스틸컷 등)
├── ui_kits/                 # 초기 HTML/React 기반 프로토타입 소스
├── DESIGN_SYSTEM.md         # 디자인 시스템 및 컬러/타이포그래피 가이드
└── colors_and_type.css      # 디자인 토큰 CSS
```

## ⚙️ 실행 방법

1. 의존성 설치
```bash
cd web
npm install
```

2. 개발 서버 실행
```bash
npm run dev
```

3. `http://localhost:3000` 으로 접속하여 확인

## 💡 주요 구현 포인트
1. **Swipe & Wheel 최적화 (`Feed.tsx`)**
   - React state 렌더링에 의존하지 않고, DOM의 `transform`을 직접 제어하여 모바일 환경에서도 60fps 수준의 부드러운 네이티브 앱 같은 스와이프 모션을 구현했습니다.
2. **Video 태그 자동 재생 대응 (`Player.tsx`)**
   - 모바일 브라우저의 엄격한 Autoplay 정책에 대응하기 위해, 진입 시 기본적으로 음소거(Muted) 상태로 재생되도록 처리했습니다.
3. **가상 데이터 구조 (`lib/data.ts`)**
   - API 연동 전 테스트를 위해 드라마 메타데이터 및 비디오 주소(`videoUrl`)를 매핑할 수 있는 구조를 마련해 두었습니다.

## 📌 테스트용 비디오 추가 방법 (로컬)
Git 저장소 용량 제한으로 인해 실제 비디오 파일(`.mp4`)은 제외되어 있습니다. 로컬에서 비디오 스와이프를 테스트하려면 다음 절차를 따르세요.
1. `web/public/` 경로 안에 `videos/` 폴더를 생성합니다.
2. 테스트용 세로형 mp4 영상 5개를 준비하여 이름을 `1.mp4` ~ `5.mp4`로 변경합니다.
3. 해당 파일들을 `web/public/videos/` 폴더에 넣고 브라우저를 새로고침하면 첫 번째 드라마에서 영상이 재생됩니다.