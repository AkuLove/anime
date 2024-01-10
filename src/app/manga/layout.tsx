'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import MangaFilter from '@/components/MangaFilter/MangaFilter';
import styles from './page.module.scss';
import SortBlock from '@/components/SortBlock/SortBlock';
import { tabletWidth } from '@/constants';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const { width } = useWindowDimensions();
  const [filterActive, setFilterActive] = useState(false);
  return (
    <main className={styles.main}>
      <div className="container">
        <div
          className={
            !params.id ? styles.body : `${styles.body} ${styles.hidden}`
          }
        >
          {!params.id && (
            <div className={styles.mobileConrols}>
              <button
                onClick={() => setFilterActive((prev) => !prev)}
                type="button"
                className={
                  !filterActive
                    ? styles.filterButton
                    : `${styles.filterButton} ${styles.active}`
                }
              >
                <Image
                  src="/filter-blue.svg"
                  width={30}
                  height={30}
                  alt="filter-icon"
                />
              </button>
              <SortBlock />
            </div>
          )}
          <div className={styles.content}>
            {width < tabletWidth && filterActive ? <MangaFilter /> : ''}
            <div className={styles.desktopConrols}>
              {width > tabletWidth ? <SortBlock /> : ''}
            </div>
            {children}
          </div>
          <div className={styles.filterDesktop}>
            <MangaFilter />
          </div>
        </div>
      </div>
    </main>
  );
}
