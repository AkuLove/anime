import SeasonsList from '@/components/SeasonsList/SeasonsList';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.mainPage}>
          <div className={styles.list}>
            <p className={styles.title}>This season&apos;s anime</p>
            <SeasonsList type="now" />
          </div>
          <div className={styles.list}>
            <p className={styles.title}>Upcoming anime</p>
            <SeasonsList type="upcoming" />
          </div>
        </div>
      </div>
    </main>
  );
}
