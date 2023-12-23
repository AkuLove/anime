import styles from './CharactersBlock.module.scss';
import CharacterItem from '../CharacterItem/CharacterItem';
import { ICharacterById } from '@/types/ICharactersById';

export default function CharactersBlock({
  isLoading,
  characters,
}: {
  isLoading: boolean;
  characters: ICharacterById[] | undefined;
}) {
  return (
    <div className={styles.characters}>
      {characters?.length !== 0 && (
        <>
          <p className={styles.characters__title}>Characters</p>
          <nav>
            <ul className={styles.characters__list}>
              {isLoading && <div>Loading...</div>}
              {characters &&
                characters.map((character) => (
                  <CharacterItem
                    item={character.character}
                    role={character.role}
                    key={character.character.mal_id}
                    characters="characters__block"
                  />
                ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
