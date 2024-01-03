import MangaFilter from '@/components/MangaFilter/MangaFilter';
import styles from './page.module.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.body}>
          {children}
          <MangaFilter />
        </div>
      </div>
    </main>
  );
}
