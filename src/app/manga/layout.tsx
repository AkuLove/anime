'use client';

import { useParams } from 'next/navigation';
import MangaFilter from '@/components/MangaFilter/MangaFilter';
import styles from './page.module.scss';
import SortBlock from '@/components/SortBlock/SortBlock';

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
          <MangaFilter />
        </div>
      </div>
    </main>
  );
}
