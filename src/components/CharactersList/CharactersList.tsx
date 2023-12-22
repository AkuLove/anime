'use client';

import CharacterItem from '../CharacterItem/CharacterItem';
import styles from './CharactersList.module.scss';
import { useGetCharactersListQuery } from '@/services/charactersApi';

export default function CharactersList() {
  const { data, isLoading } = useGetCharactersListQuery({
    type: 'characters',
    limit: '20',
  });

  return (
    <ul className={styles.list}>
      {isLoading && <div>Loading...</div>}
      {data?.data.map((item) => (
        <CharacterItem key={item.mal_id} item={item} />
      ))}
    </ul>
  );
}
