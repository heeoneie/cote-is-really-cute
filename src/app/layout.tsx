import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ThemeInitializer from '@components/system/ThemeInitializer';
import { Toaster } from 'react-hot-toast';
import { InitUserStore } from '@stores/userStore';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '코테는 정말 귀여워',
  description: '코딩하기',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InitUserStore />
        <ThemeInitializer />
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
