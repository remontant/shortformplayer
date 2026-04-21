export interface Episode {
  ep: number;
  title: string;
  duration: number;
  videoUrl?: string;
}

export interface Series {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  poster: string;
  genre: string;
  season: number;
  totalEp: number;
  stills: string[];
  episodes: Episode[];
  isComingSoon?: boolean;
}

export interface FeedEntry {
  id: string;
  seriesId: string;
  ep?: number;
  epTitle?: string;
  duration?: number;
  videoUrl?: string;
  comingSoon?: boolean;
  nextEp?: number;
}

export const SERIES: Series[] = [
  {
    id: 'tenth-date',
    title: '열 번째 소개팅',
    tagline: '매번 실패하는데도 왜 또 나가는 걸까.',
    synopsis: '서른셋의 기획자 지아. 엄마의 등쌀에 떠밀려 소개팅만 아홉 번. 열 번째 자리에서 만난 남자는, 뭔가 달랐다.',
    poster: 'https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/dn/2025/12/25/news_1766621867_1590110_m_1.jpg',
    genre: '로맨스',
    season: 1,
    totalEp: 20,
    stills: [
      '/assets/stills/tenth-date-1.svg',
      '/assets/stills/tenth-date-2.svg',
      '/assets/stills/tenth-date-3.svg',
    ],
    episodes: [
      { ep: 1, title: '엄마의 부탁',       duration: 92, videoUrl: '/videos/1.mp4' },
      { ep: 2, title: '바람잡이 친구',     duration: 88, videoUrl: '/videos/2.mp4' },
      { ep: 3, title: '세 번째는 다르겠지', duration: 95, videoUrl: '/videos/3.mp4' },
      { ep: 4, title: '카페에서 만난 남자', duration: 100, videoUrl: '/videos/4.mp4' },
      { ep: 5, title: '우연은 두 번',       duration: 104, videoUrl: '/videos/5.mp4' },
    ],
  },
  {
    id: 'midnight-store',
    title: '밤의 편의점',
    tagline: '3시, 손님이 아닌 것이 온다.',
    synopsis: '새벽 3시. 빈 편의점에 들어온 손님은 거스름돈을 받지 않고 떠났다. 다음날 새벽 3시, 그 자리에 또 무언가가 서 있었다.',
    poster: 'https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/pt/2025/06/25/202506251513774807_685b93d6d6ee9.jpg',
    genre: '스릴러',
    season: 2,
    totalEp: 20,
    stills: [
      '/assets/stills/midnight-store-1.svg',
      '/assets/stills/midnight-store-2.svg',
      '/assets/stills/midnight-store-3.svg',
    ],
    episodes: [
      { ep: 1, title: '첫 손님',        duration: 98 },
      { ep: 2, title: '거스름돈',       duration: 105 },
      { ep: 3, title: '신선식품 코너',  duration: 110 },
      { ep: 4, title: '계산대 앞',      duration: 98 },
      { ep: 5, title: '셔터를 내릴 때', duration: 112 },
    ],
  },
  {
    id: 'secretly',
    title: '사장님 몰래',
    tagline: '편의점 알바의 은밀한 취미생활.',
    synopsis: '대학 졸업반 민호. 밤 알바를 핑계로 시작한 소소한 딴짓이, 어느새 전국구 맛집으로 소문나버렸다.',
    poster: 'https://cdn.startupn.kr/news/photo/202503/51236_52662_2037.png',
    genre: '코미디',
    season: 1,
    totalEp: 20,
    stills: [
      '/assets/stills/secretly-1.svg',
      '/assets/stills/secretly-2.svg',
      '/assets/stills/secretly-3.svg',
    ],
    episodes: [
      { ep: 1, title: '야간 근무 시작',   duration: 82 },
      { ep: 2, title: '삼각김밥 레시피', duration: 85 },
      { ep: 3, title: '손님이 늘었다',   duration: 90 },
      { ep: 4, title: '단골 셰프',       duration: 88 },
      { ep: 5, title: '사장님이 돌아왔다', duration: 95 },
    ],
  },
  {
    id: 'again-eighteen',
    title: '다시, 열여덟',
    tagline: '서른넷이 교복을 입었다.',
    synopsis: '실패만 남은 34살. 동창회 다음 날, 거울 속에는 17년 전 내가 서 있었다. 다시 시작할 수 있다면, 무엇을 바꾸고 싶은가.',
    poster: 'https://cdn.ppss.kr/news/photo/202604/291524_106662_940.jpg',
    genre: '판타지',
    season: 1,
    totalEp: 20,
    stills: [
      '/assets/stills/again-eighteen-1.svg',
      '/assets/stills/again-eighteen-2.svg',
      '/assets/stills/again-eighteen-3.svg',
    ],
    episodes: [
      { ep: 1, title: '거울 속의 나',  duration: 96 },
      { ep: 2, title: '2교시 수학',    duration: 92 },
      { ep: 3, title: '그 시절 친구',  duration: 100 },
      { ep: 4, title: '첫사랑의 편지', duration: 88 },
      { ep: 5, title: '돌아가는 길',   duration: 104 },
    ],
  },
  {
    id: 'top-of-class',
    title: '일등의 세계',
    tagline: '전교 1등은 어떻게 만들어지는가.',
    synopsis: '언제나 1등을 놓치지 않던 서연. 하지만 새로운 전학생이 오면서 완벽했던 그녀의 세계에 금이 가기 시작한다.',
    poster: 'https://pimg.mk.co.kr/news/cms/202512/15/news-p.v1.20251215.ea505366af454742a7cefbf73ddd10b7_P1.png',
    genre: '미스터리',
    season: 1,
    totalEp: 15,
    stills: [
      '/assets/stills/top-of-class-1.svg',
      '/assets/stills/top-of-class-2.svg',
      '/assets/stills/top-of-class-3.svg',
    ],
    episodes: [],
    isComingSoon: true,
  },
];

export function getSeries(id: string): Series | undefined {
  return SERIES.find((s) => s.id === id);
}

export function getFeedFor(seriesId: string): FeedEntry[] {
  const s = getSeries(seriesId);
  if (!s) return [];
  const entries: FeedEntry[] = s.episodes.map((e) => ({
    id: `${s.id}-${e.ep}`,
    seriesId: s.id,
    ep: e.ep,
    epTitle: e.title,
    duration: e.duration,
    videoUrl: e.videoUrl,
  }));
  if (s.episodes.length < s.totalEp) {
    entries.push({
      id: `${s.id}-coming-soon`,
      seriesId: s.id,
      comingSoon: true,
      nextEp: s.episodes.length + 1,
    });
  }
  return entries;
}

export function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}
