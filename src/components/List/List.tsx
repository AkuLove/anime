'use client';

import React, { useEffect, useState } from 'react';
import styles from './List.module.scss';
import { useGetFilteredListMutation } from '@/services/listApi';
import Item from '../Item/Item';
import { ISingleManga } from '@/types/IManga';
import { ISingleAnime } from '@/types/IAnime';
import Loader from '../UI/Loader/Loader';

export default function List({
  type,
  query,
}: {
  type: 'anime' | 'manga';
  query?: string;
}) {
  const [list, setList] = useState<ISingleAnime[] | ISingleManga[] | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [lastVisiblePage, setLastVisiblePage] = useState(1);
  const [filterData, { isLoading }] = useGetFilteredListMutation();
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

  const checkType = (
    Itemslist: ISingleAnime[] | ISingleManga[]
  ): Itemslist is ISingleAnime[] => {
    return type === 'anime';
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const checkFilters = () => {
    const altQuery = 'sfw=true&';
    filterData({ type, filterValue: `${query ? `${query}&` : altQuery}`, page })
      .unwrap()
      .then((response) => {
        if (list && checkType(response.data) && checkType(list)) {
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
      {isLoading && !list && <Loader />}
      {list &&
        list.length !== 0 &&
        list.map((item) => <Item key={item.title} item={item} type={type} />)}
      {list && list.length === 0 && (
        <p className={styles.noResults}>No results</p>
      )}
      {fetching && list && <Loader />}
    </ul>
  );
}
