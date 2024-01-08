'use client';

import { useParams } from 'next/navigation';
import SortBlock from '@/components/SortBlock/SortBlock';
import styles from './page.module.scss';
import AnimeFilter from '@/components/AnimeFilter/AnimeFilter';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  return (
    <main className={styles.main}>
      <div className="container">
        <div
          className={
            !params.id ? styles.body : `${styles.body} ${styles.hidden}`
          }
        >
          <div>
            <SortBlock />
            {children}
          </div>
          <AnimeFilter />
        </div>
      </div>
    </main>
  );
}
