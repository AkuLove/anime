import List from '@/components/List/List';
import styles from './page.module.scss';

export default function Manga() {
  return (
    <main className={styles.main}>
      <div className="container">
        <List type="manga" />
      </div>
    </main>
  );
}
