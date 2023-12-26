import List from '@/components/List/List';
import styles from './page.module.scss';
import Filter from '@/components/Filter/Filter';

export default function Anime() {
  return (
    <main className={styles.main}>
      <div className="container">
        <List type="anime" />
        <Filter />
      </div>
    </main>
  );
}
