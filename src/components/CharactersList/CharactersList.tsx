'use client';

import { useEffect, useState } from 'react';
import CharacterItem from '../CharacterItem/CharacterItem';
import Loader from '../UI/Loader/Loader';
import styles from './CharactersList.module.scss';
import { useGetCharactersListMutation } from '@/services/charactersApi';
import { ISingleCharacter } from '@/types/ICharacters';

export default function CharactersList() {
  const [list, setList] = useState<ISingleCharacter[] | null>(null);
  const [page, setPage] = useState(1);
  const [lastVisiblePage, setLastVisiblePage] = useState(1);
  const [charactersData, { isLoading }] = useGetCharactersListMutation();
  const [fetching, setFetching] = useState(true);

  const scrollHandler = () => {
    const { scrollHeight } = document.documentElement;
    const { scrollTop } = document.documentElement;
    const { innerHeight } = window;
    if (
      scrollHeight - (scrollTop + innerHeight) < 100 &&
      page <= lastVisiblePage
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const checkFilters = () => {
    charactersData({ page })
      .unwrap()
      .then((response) => {
        console.log(response);
        if (list) {
          setList([...list, ...response.data]);
        } else {
          setList(response.data);
        }
        setLastVisiblePage(response.pagination.last_visible_page);
        setPage((prev) => prev + 1);
      })
      .finally(() => setFetching(false));
  };

  useEffect(() => {
    if (fetching) {
      checkFilters();
    }
  }, [fetching]);

  return (
    <ul className={styles.list}>
      {list &&
        list.map((item) => <CharacterItem key={item.mal_id} item={item} />)}
      {isLoading && <Loader />}
    </ul>
  );
}
