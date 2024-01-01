'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import styles from './List.module.scss';
import {
  useGetFilteredListMutation,
  useGetListQuery,
} from '@/services/listApi';
import Item from '../Item/Item';
import { ISingleManga } from '@/types/IManga';
import { ISingleAnime } from '@/types/IAnime';

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
  const params = useParams();
  const pathName = usePathname();
  const { data, isLoading } = useGetListQuery(type);
  const [filterData, { isLoading: isFilterDataLoading }] =
    useGetFilteredListMutation();

  const checkFilters = () => {
    if (query) {
      filterData({ type, filterValue: query })
        .unwrap()
        .then((response) => {
          setList(response.data);
        });
    } else if (data?.data) {
      setList(data?.data);
    }
  };

  useEffect(() => {
    if (
      (data?.data && list && list.length === 0) ||
      pathName === '/anime' ||
      pathName === '/manga'
    ) {
      if (data) {
        setList(data.data);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    checkFilters();
  }, [params]);

  return (
    <ul className={styles.list}>
      {isFilterDataLoading && !list && <div>Loading...</div>}
      {list &&
        list.length !== 0 &&
        list.map((item) => <Item key={item.title} item={item} type={type} />)}
      {list && list.length === 0 && (
        <p className={styles.noResults}>No results</p>
      )}
    </ul>
  );
}
