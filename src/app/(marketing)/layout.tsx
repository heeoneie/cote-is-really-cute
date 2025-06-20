import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '코테는 정말 귀여워 - 시작하기',
  description: '회원가입 또는 로그인으로 시작하세요',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
