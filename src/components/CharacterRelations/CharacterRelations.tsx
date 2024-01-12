import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Anime, Manga } from '@/types/ICharacters';
import styles from './CharacterRelations.module.scss';
import ShowMoreButton from '../UI/ShowMoreButton/ShowMoreButton';

export default function CharacterRelations({
  type,
  list,
}: {
  type: 'anime' | 'manga';
  list: Anime[] | Manga[];
}) {
  const isAnime = (checkedlist: Anime[] | Manga[]): checkedlist is Anime[] => {
    if (list.length !== 0 && 'anime' in list[0]) {
      return true;
    }
    return false;
  };
  const [active, setActive] = useState(false);

  return (
    <div className={styles.relation}>
      {!!list.length && <p className={styles.relation__type}>{type}:</p>}
      <ul
        className={
          !active && list && list.length > 3
            ? styles.relation__list
            : `${styles.relation__list} ${styles.active}`
        }
      >
        {isAnime(list)
          ? list.map((item) => (
              <li key={item.anime.mal_id} className={styles.relation__item}>
                <Link
                  href={`/anime/${item.anime.mal_id}`}
                  className={styles.relation__title}
                >
                  {item.anime.title}
                </Link>
                <div className={styles.relation__body}>
                  <Link
                    className={styles.image__body}
                    href={`/anime/${item.anime.mal_id}`}
                  >
                    <Image
                      src={
                        item.anime.images.webp.image_url ||
                        item.anime.images.jpg.image_url ||
                        '/not-found-image.jpeg'
                      }
                      className={styles.image}
                      width={80}
                      height={120}
                      priority={false}
                      alt={item.anime.title}
                    />
                  </Link>
                  <p className={styles.relation__role}>Role: {item.role}</p>
                </div>
              </li>
            ))
          : list.map((item) => (
              <li key={item.manga.mal_id} className={styles.relation__item}>
                <Link
                  href={`/manga/${item.manga.mal_id}`}
                  className={styles.relation__title}
                >
                  {item.manga.title}
                </Link>
                <div className={styles.relation__body}>
                  <Link
                    className={styles.image__body}
                    href={`/manga/${item.manga.mal_id}`}
                  >
                    <Image
                      src={
                        item.manga.images.webp.image_url ||
                        item.manga.images.jpg.image_url ||
                        '/not-found-image.jpeg'
                      }
                      className={styles.image}
                      width={80}
                      height={120}
                      priority={false}
                      alt={item.manga.title}
                    />
                  </Link>
                  <p className={styles.relation__role}>Role: {item.role}</p>
                </div>
              </li>
            ))}
        {list && list.length > 3 && (
          <ShowMoreButton active={active} setActive={setActive} />
        )}
      </ul>
    </div>
  );
}
