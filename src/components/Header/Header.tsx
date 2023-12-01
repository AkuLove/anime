import Link from 'next/link';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
import DefaultInput from '../UI/DefaultInput.module.scss/DefaultInput';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <footer className={styles.header}>
      <div className="container">
        <div className={styles.body}>
          <div className={styles.logo}>
            <Link href="/">AkuAnime</Link>
          </div>
          <nav className={styles.menu__navigation}>
            <ul className={styles.menu__list}>
              <li className={styles.menu__item}>
                <Link href="/anime">Anime</Link>
              </li>
              <li className={styles.menu__item}>
                <Link href="/manga">Manga</Link>
              </li>
              <li className={styles.menu__item}>
                <Link href="/characters">Characters</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.searchbar}>
            <DefaultInput placeholder="Search Anime, Manga and Characters" />
          </div>
          <div className={styles.logIn}>
            <DefaultButton>Log In</DefaultButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
