import type { Metadata } from 'next';
import { Roboto, Titillium_Web } from 'next/font/google';
import './globals.scss';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { StoreProvider } from '@/store/StoreProvider';

const Titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['400', '700'],
  fallback: ['Montserrat'],
  variable: '--font-titillium',
});

const Robot = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  fallback: ['Titillium_Web'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'AkuAnime',
  description: 'Your best anime website',
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Marat Nikolaev', url: 'https://github.com/AkuLove' }],
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Titillium.variable} ${Robot.variable}`}>
        <StoreProvider>
          <div className="wrapper">
            <Header />
            {children}
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
