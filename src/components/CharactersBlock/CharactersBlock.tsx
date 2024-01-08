import { useState } from 'react';
import styles from './CharactersBlock.module.scss';
import CharacterItem from '../CharacterItem/CharacterItem';
import { ICharacterById } from '@/types/ICharactersById';
import Loader from '../UI/Loader/Loader';
import ShowMoreButton from '../UI/ShowMoreButton/ShowMoreButton';

export default function CharactersBlock({
  isLoading,
  characters,
}: {
  isLoading: boolean;
  characters: ICharacterById[] | undefined;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.characters}>
      {characters?.length !== 0 && (
        <>
          <p className={styles.characters__title}>Characters</p>
          <nav className={styles.characters__list_body}>
            <ul
              className={
                !active && characters && characters.length > 4
                  ? styles.characters__list
                  : `${styles.characters__list} ${styles.active}`
              }
            >
              {isLoading && <Loader />}
              {characters &&
                characters.map((character) => (
                  <CharacterItem
                    item={character.character}
                    role={character.role}
                    key={character.character.mal_id}
                    characters="characters__block"
                  />
                ))}
              {characters && characters.length > 4 && (
                <ShowMoreButton active={active} setActive={setActive} />
              )}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
