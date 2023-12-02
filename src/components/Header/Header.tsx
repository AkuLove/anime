'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
import DefaultInput from '../UI/DefaultInput.module.scss/DefaultInput';
import styles from './Header.module.scss';
import { headerLinks, headerPages } from '@/constants';

export default function Header() {
  const pathName = usePathname();

  return (
    <footer className={styles.header}>
      <div className="container">
        <div className={styles.body}>
          <div className={styles.logo}>
            <Link href="/">AkuAnime</Link>
          </div>
          <nav className={styles.menu__navigation}>
            <ul className={styles.menu__list}>
              {headerLinks.map((link, index) => (
                <li className={styles.menu__item}>
                  <Link
                    className={pathName === link ? `${styles.active}` : ''}
                    href={link}
                  >
                    {headerPages[index]}
                  </Link>
                </li>
              ))}
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
