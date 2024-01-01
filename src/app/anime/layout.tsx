import styles from './page.module.scss';
import AnimeFilter from '@/components/AnimeFilter/AnimeFilter';

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
          <AnimeFilter />
        </div>
      </div>
    </main>
  );
}
