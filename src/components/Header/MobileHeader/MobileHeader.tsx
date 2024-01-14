'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import DefaultInput from '@/components/UI/DefaultInput/DefaultInput';
import styles from './MobileHeader.module.scss';
import { headerLinks, headerPages } from '@/constants';
import {
  useGetRandomAnimeMutation,
  useGetAnimeSearchMutation,
} from '@/services/animeApi';
import { ISingleAnime } from '@/types/IAnime';
import useDebounce from '@/hooks/useDebounce';
import SearchModal from '@/components/SearchModal/SearchModal';
import { ISingleManga } from '@/types/IManga';
import { ISingleCharacter } from '@/types/ICharacters';
import { useGetMangaSearchMutation } from '@/services/mangaApi';
import { useGetCharacterSearchMutation } from '@/services/charactersApi';

export default function MobileHeader() {
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [animeList, setAnimeList] = useState<ISingleAnime[] | null>(null);
  const [mangaList, setMangaList] = useState<ISingleManga[] | null>(null);
  const [charactersList, setCharactersList] = useState<
    ISingleCharacter[] | null
  >(null);
  const [randomAnime, { isLoading: isRandomAnimeLoading }] =
    useGetRandomAnimeMutation();
  const [animeSearch] = useGetAnimeSearchMutation();
  const [mangaSearch] = useGetMangaSearchMutation();
  const [charactersSearch] = useGetCharacterSearchMutation();
  const pathName = usePathname();
  const router = useRouter();

  const getRandomAnime = async () => {
    const id = await randomAnime()
      .unwrap()
      .then((res) => res.data.mal_id);
    router.push(`/anime/${id}`);
  };

  const getListsFromSearch = async (searchValue: string) => {
    if (searchValue.length >= 3) {
      animeSearch(searchValue)
        .unwrap()
        .then((result) => setAnimeList(result.data));
      mangaSearch(searchValue)
        .unwrap()
        .then((result) => setMangaList(result.data));
      charactersSearch(searchValue)
        .unwrap()
        .then((result) => setCharactersList(result.data));
    }
  };

  useEffect(() => {
    if (search.length < 3) {
      setAnimeList(null);
      setMangaList(null);
      setCharactersList(null);
    }
  }, [search]);

  useEffect(() => {
    setBurgerActive(false);
  }, [pathName]);

  useDebounce(() => getListsFromSearch(search), 1000, [search]);

  return (
    <header className={styles.header}>
      <div
        role="presentation"
        onClick={() => setBurgerActive(false)}
        className={
          !burgerActive
            ? styles.menu__background
            : `${styles.menu__background} ${styles.active}`
        }
      />
      <div className="container">
        <div className={styles.body}>
          <div className={styles.logo}>
            <Link href="/">AkuAnime</Link>
          </div>
          <div className={styles.controls}>
            <button
              onClick={() => setSearchActive((prev) => !prev)}
              type="button"
              className={styles.controls__search}
            >
              <Image
                src="/search.svg"
                alt="search logo"
                width={36}
                height={36}
              />
            </button>
            <button
              type="button"
              onClick={() => setBurgerActive((prev) => !prev)}
              className={
                !burgerActive
                  ? styles.controls__burger
                  : `${styles.controls__burger} ${styles.active}`
              }
            >
              {' '}
            </button>
          </div>
          <nav
            className={
              !burgerActive
                ? styles.menu__navigation
                : `${styles.menu__navigation} ${styles.active}`
            }
          >
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
                onClick={() => !isRandomAnimeLoading && getRandomAnime()}
                type="button"
                className={styles.menu__item}
              >
                Random Anime
              </button>
            </ul>
          </nav>
          <div
            className={
              !searchActive
                ? styles.searchbar
                : `${styles.searchbar} ${styles.active}`
            }
          >
            <DefaultInput
              searchValue={search}
              setSearch={setSearch}
              setFocus={setFocus}
              placeholder="Search Anime, Manga and Characters"
            />
            {(animeList || mangaList || charactersList) && (
              <SearchModal
                animeList={animeList}
                mangaList={mangaList}
                charactersList={charactersList}
                focus={focus}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
