'use client';

import styles from './List.module.scss';
import { useGetListQuery } from '@/services/listApi';
import Item from '../Item/Item';

export default function List({ type }: { type: 'anime' | 'manga' }) {
  const { data, isLoading } = useGetListQuery(type);

  return (
    <ul className={styles.list}>
      {isLoading && <div>Loading...</div>}
      {data?.data.map((item) => (
        <Item key={item.title} item={item} type={type} />
      ))}
    </ul>
  );
}
