'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
import DefaultInput from '../UI/DefaultInput/DefaultInput';
import styles from './Header.module.scss';
import { headerLinks, headerPages } from '@/constants';
import {
  useGetRandomAnimeMutation,
  useGetAnimeSearchMutation,
} from '@/services/animeApi';
import { ISingleAnime } from '@/types/IAnime';
import useDebounce from '@/hooks/useDebounce';
import SearchModal from '../SearchModal/SearchModal';
import { ISingleManga } from '@/types/IManga';
import { ISingleCharacter } from '@/types/ICharacters';
import { useGetMangaSearchMutation } from '@/services/mangaApi';
import { useGetCharacterSearchMutation } from '@/services/charactersApi';

export default function Header() {
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
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

  useDebounce(() => getListsFromSearch(search), 1000, [search]);

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
                onClick={() => !isRandomAnimeLoading && getRandomAnime()}
                type="button"
                className={styles.menu__item}
              >
                Random Anime
              </button>
            </ul>
          </nav>
          <div className={styles.searchbar}>
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
          <div className={styles.logIn}>
            <DefaultButton className="">Log In</DefaultButton>
          </div>
        </div>
      </div>
    </header>
  );
}
