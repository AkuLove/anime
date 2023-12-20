import CharactersList from '@/components/CharactersList/CharactersList';
import styles from './page.module.scss';

export default function Characters() {
  return (
    <main className={styles.main}>
      <div className="container">
        <CharactersList />
      </div>
    </main>
  );
}
