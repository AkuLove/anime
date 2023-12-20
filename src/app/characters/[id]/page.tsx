'use client';

import { useEffect } from 'react';
import { useGetSingleCharacterQuery } from '@/services/charactersApi';
import styles from './page.module.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getCharacterInfo } from '@/store/CharactersSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import CharacterInfo from '@/components/CharacterInfo/CharacterInfo';

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
  const description = useAppSelector((state) => state.charaters.description);
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
            <div className={styles.character__description}>
              {description.map((sentence) => (
                <p key={sentence}>{`${sentence}`}</p>
              ))}
            </div>
            <CharacterInfo item={character} />
          </div>
        )}
      </div>
    </main>
  );
}
