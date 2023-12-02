'use client';

import styles from './List.module.scss';
import { useGetListQuery } from '@/services/animeApi';
import Item from '../Item/Item';

export default function List({ type }: { type: 'anime' | 'manga' }) {
  const { data, isLoading } = useGetListQuery(type);

  return (
    <ul className={styles.list}>
      {isLoading && <div>Loading...</div>}
      {data?.data.map((item) => {
        return <Item key={item.mal_id} item={item} />;
      })}
    </ul>
  );
}
