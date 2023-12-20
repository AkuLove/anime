'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
import DefaultInput from '../UI/DefaultInput.module.scss/DefaultInput';
import styles from './Header.module.scss';
import { headerLinks, headerPages } from '@/constants';
import { useGetRandomAnimeMutation } from '@/services/animeApi';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function Header() {
  const pathName = usePathname();
  const router = useRouter();
  const isPageLoading = useAppSelector(
    (state) => state.anime.isSingleAnimePageLoading
  );

  const [randomAnime, { isLoading }] = useGetRandomAnimeMutation();

  const getRandomAnime = async () => {
    const id = await randomAnime()
      .unwrap()
      .then((res) => res.data.mal_id);
    router.push(`/anime/${id}`);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.body}>
          <div className={styles.logo}>
            <Link href="/">AkuAnime</Link>
          </div>
          <nav className={styles.menu__navigation}>
            <ul className={styles.menu__list}>
              {headerLinks.map((link, index) => (
                <li key={link} className={styles.menu__item}>
                  <Link
                    className={pathName === link ? `${styles.active}` : ''}
                    href={link}
                  >
                    {headerPages[index]}
                  </Link>
                </li>
              ))}
              <button
                onClick={() => !isLoading && !isPageLoading && getRandomAnime()}
                type="button"
                className={styles.menu__item}
              >
                Random Anime
              </button>
            </ul>
          </nav>
          <div className={styles.searchbar}>
            <DefaultInput placeholder="Search Anime, Manga and Characters" />
          </div>
          <div className={styles.logIn}>
            <DefaultButton className="">Log In</DefaultButton>
          </div>
        </div>
      </div>
    </header>
  );
}
