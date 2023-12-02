import Image from 'next/image';
import { ISingleAnime } from '@/types/IAnime';
import styles from './Item.module.scss';
import notFoundImage from '../../../public/not-found-image.jpeg';

export default function Item({ item }: { item: ISingleAnime }) {
  const imageWebp = item.images.webp.large_image_url;
  const imageJpg = item.images.jpg.large_image_url;

  return (
    <li className={styles.item}>
      <div className={styles.image}>
        <Image
          src={imageWebp || imageJpg || notFoundImage}
          width={150}
          height={210}
          alt={item.title}
          objectFit="contain"
        />
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.title__jap}>{item.title_japanese}</p>
        <div className={styles.genres}>
          {Object.values(item.genres).map((genre) => (
            <span>{genre.name}</span>
          ))}
        </div>
        <p className={styles.description}>
          {item.synopsis.replace('[Written by MAL Rewrite]', '')}
        </p>
      </div>
    </li>
  );
}
