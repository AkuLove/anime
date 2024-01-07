import MangaFilter from '@/components/MangaFilter/MangaFilter';
import styles from './page.module.scss';
import SortBlock from '@/components/SortBlock/SortBlock';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <div className="container">
      <div className={styles.body}>
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
