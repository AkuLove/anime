'use client';

import { useEffect } from 'react';
import { useGetSingleCharacterQuery } from '@/services/charactersApi';
import styles from './page.module.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getCharacterInfo } from '@/store/CharactersSlice';
import CharacterInfo from '@/components/CharacterInfo/CharacterInfo';
import CharacterDescription from '@/components/CharacterDescription/CharacterDescription';

export default function SingleCharacter({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading } = useGetSingleCharacterQuery({
    id: params.id,
  });
  const character = data?.data;
  const dispatch = useAppDispatch();
  // const info = useAppSelector((state) => state.charaters.characterInfo);

  useEffect(() => {
    if (character) {
      dispatch(getCharacterInfo(character?.about));
    }
  }, [character?.mal_id]);
  return (
    <main className={styles.character}>
      <div className="container">
        {isLoading && <div>Loading...</div>}
        {character && (
          <div className={styles.character__body}>
            <CharacterDescription character={character} />
            <CharacterInfo item={character} />
          </div>
        )}
      </div>
    </main>
  );
}
