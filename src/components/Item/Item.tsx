import Image from 'next/image';
import Link from 'next/link';
import { ISingleAnime } from '@/types/IAnime';
import styles from './Item.module.scss';
import notFoundImage from '../../../public/not-found-image.jpeg';

export default function Item({
  item,
  type,
}: {
  item: ISingleAnime;
  type: string;
}) {
  const imageWebp = item.images.webp.large_image_url;
  const imageJpg = item.images.jpg.large_image_url;

  return (
    <li className={styles.item}>
      <Link href={`/${type}/${item.mal_id}`} className={styles.image}>
        <Image
          src={imageWebp || imageJpg || notFoundImage}
          width={150}
          height={210}
          alt={item.title}
        />
      </Link>
      <div className={styles.body}>
        <Link href={`/${type}/${item.mal_id}`} className={styles.title}>
          {item.title}
        </Link>
        <p className={styles.title__jap}>{item.title_japanese}</p>
        <div className={styles.genres}>
          {Object.values(item.genres).map((genre) => (
            <span key={genre.mal_id}>{genre.name}</span>
          ))}
          {Object.values(item.themes).map((theme) => (
            <span key={theme.name}>{theme.name}</span>
          ))}
        </div>
        <p className={styles.description}>
          {item.synopsis
            .replace('[Written by MAL Rewrite]', '')
            .replace('(Source: Funimation)', '')}
        </p>
      </div>
    </li>
  );
}
