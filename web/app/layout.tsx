import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Drama Pann — 한 입씩 먹는 숏폼 드라마',
  description: '숏폼 드라마',
  icons: { icon: '/assets/favicon.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  );
}
