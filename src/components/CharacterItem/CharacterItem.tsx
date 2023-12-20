import Image from 'next/image';
import Link from 'next/link';
import { ISingleCharacter } from '@/types/ICharacters';
import styles from './CharacterItem.module.scss';

export default function CharacterItem({ item }: { item: ISingleCharacter }) {
  const imageWebp = item.images.webp.image_url;
  const imageJpg = item.images.jpg.image_url;

  return (
    <li className={styles.item}>
      <Link href={`/characters/${item.mal_id}`}>
        <Image
          src={imageWebp || imageJpg || '/not-found-image.jpeg'}
          width={150}
          height={210}
          alt={item.name}
        />
      </Link>
      <Link href={`/characters/${item.mal_id}`}>
        <p className={styles.name}>{item.name}</p>
      </Link>
    </li>
  );
}
