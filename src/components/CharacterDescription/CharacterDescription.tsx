'use client';

import { ISingleCharacterFull } from '@/types/ICharacters';
import CharacterRelations from '../CharacterRelations/CharacterRelations';
import styles from './CharacterDescription.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function CharacterDescription({
  character,
}: {
  character: ISingleCharacterFull;
}) {
  const description = useAppSelector((state) => state.charaters.description);

  const checkSpaces = (sentence: string) => {
    let spacesCount = 0;
    for (let i = 0; i < sentence.length; i += 1) {
      if (sentence[i] === ' ') {
        spacesCount += 1;
      }
    }
    return spacesCount <= 3;
  };

  return (
    <div className={styles.description}>
      {description.map((sentence) => (
        <p
          className={checkSpaces(sentence) ? styles.title : styles.text}
          key={sentence}
        >
          {sentence}
        </p>
      ))}
      <CharacterRelations type="anime" list={character.anime} />
      <CharacterRelations type="manga" list={character.manga} />
    </div>
  );
}
