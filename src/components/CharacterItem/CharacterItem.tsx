import Image from 'next/image';
import Link from 'next/link';
import { ISingleCharacter } from '@/types/ICharacters';
import styles from './CharacterItem.module.scss';

export default function CharacterItem({
  item,
  characters,
  role,
}: {
  item: ISingleCharacter;
  characters?: string;
  role?: string;
}) {
  const imageWebp = item.images.webp.image_url;
  const imageJpg = item.images.jpg.image_url;

  return (
    <li className={styles.item}>
      {characters && (
        <Link href={`/characters/${item.mal_id}`}>
          <p className={styles.name}>{item.name}</p>
        </Link>
      )}
      <div className={styles.body}>
        <Link href={`/characters/${item.mal_id}`}>
          <Image
            className={characters && `${styles[characters]}`}
            src={imageWebp || imageJpg || '/not-found-image.jpeg'}
            width={150}
            height={220}
            alt={item.name}
          />
        </Link>
        {role && (
          <div>
            <p>Role:</p>
            <p>{role}</p>
          </div>
        )}
      </div>
      {!characters && (
        <Link href={`/characters/${item.mal_id}`}>
          <p className={styles.name}>{item.name}</p>
        </Link>
      )}
    </li>
  );
}
