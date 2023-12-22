import Image from 'next/image';
import Link from 'next/link';
import { Anime, Manga } from '@/types/ICharacters';
import styles from './CharacterRelations.module.scss';

export default function CharacterRelations({
  type,
  list,
}: {
  type: 'anime' | 'manga';
  list: Anime[] | Manga[];
}) {
  const isAnime = (checkedlist: Anime[] | Manga[]): checkedlist is Anime[] => {
    return 'anime' in list[0];
  };

  return (
    <div className={styles.relation}>
      <p className={styles.relation__type}>{type}:</p>
      <ul className={styles.relation__list}>
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
                  <Link href={`/anime/${item.anime.mal_id}`}>
                    <Image
                      src={
                        item.anime.images.webp.image_url ||
                        item.anime.images.jpg.image_url ||
                        '/not-found-image.jpeg'
                      }
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
                  <Link href={`/manga/${item.manga.mal_id}`}>
                    <Image
                      src={
                        item.manga.images.webp.image_url ||
                        item.manga.images.jpg.image_url ||
                        '/not-found-image.jpeg'
                      }
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
      </ul>
    </div>
  );
}
