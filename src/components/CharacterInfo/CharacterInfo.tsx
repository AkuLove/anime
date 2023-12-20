import Image from 'next/image';
import styles from './CharacterInfo.module.scss';
import { ISingleCharacterFull } from '@/types/ICharacters';

export default function CharacterInfo({
  item,
}: {
  item: ISingleCharacterFull;
}) {
  const imageWebp = item.images.webp.image_url;
  const imageJpg = item.images.jpg.image_url;

  return (
    <div className={styles.item}>
      <div className={styles.item__body}>
        <p>{item.name}</p>
        <Image
          src={imageWebp || imageJpg || '/not-found-image.jpeg'}
          width={150}
          height={210}
          alt={item.name}
        />
      </div>
    </div>
  );
}
