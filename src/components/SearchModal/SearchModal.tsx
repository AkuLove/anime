import Image from 'next/image';
import Link from 'next/link';
import { ISingleAnime } from '@/types/IAnime';
import styles from './SearchModal.module.scss';
import { ISingleManga } from '@/types/IManga';
import { ISingleCharacter } from '@/types/ICharacters';

export default function SearchModal({
  animeList,
  mangaList,
  charactersList,
  focus,
}: {
  animeList: ISingleAnime[] | null;
  mangaList: ISingleManga[] | null;
  charactersList: ISingleCharacter[] | null;
  focus: boolean;
}) {
  const checkNoResults = () => {
    if (!animeList?.length && !mangaList?.length && !charactersList?.length) {
      return <div>No results</div>;
    }
  };

  const showlist = (
    list: ISingleAnime[] | ISingleManga[],
    type: 'anime' | 'manga'
  ) => {
    return list.map((item) => (
      <li key={`${type}${item.mal_id}`} className={styles.searchModal__item}>
        <Link href={`/${type}/${item.mal_id}`}>
          <Image
            src={
              item.images.webp.image_url ||
              item.images.jpg.image_url ||
              '/not-found-image.jpeg'
            }
            height={70}
            width={50}
            alt={item.title}
          />
        </Link>
        <div className={styles.searchModal__info}>
          <Link href={`/${type}/${item.mal_id}`}>
            <p className={styles.searchModal__title}>{item.title}</p>
            <p className={styles.searchModal__titleJap}>
              {item.title_japanese}
            </p>
            <p className={styles.searchModal__type}>{item.type}</p>
          </Link>
        </div>
      </li>
    ));
  };

  const checkList = (list: ISingleAnime[] | ISingleManga[] | null) => {
    if (list && list?.length > 0) {
      if ('aired' in list[0]) {
        return (
          <>
            <p className={styles.searchModal__typeTitle}>Anime</p>
            <ul className={styles.searchModal__list}>
              {showlist(list, 'anime')}
            </ul>
          </>
        );
      }
      return (
        <>
          <p className={styles.searchModal__typeTitle}>Manga</p>
          <ul className={styles.searchModal__list}>
            {showlist(list, 'manga')}
          </ul>
        </>
      );
    }
  };

  const checkCharactersList = (list: ISingleCharacter[] | null) => {
    if (list && list?.length > 0) {
      return (
        <>
          <p className={styles.searchModal__typeTitle}>Characters</p>
          <ul className={styles.searchModal__list}>
            {list?.map((item) => (
              <li
                key={`character${item.mal_id}`}
                className={styles.searchModal__item}
              >
                <Link href={`/characters/${item.mal_id}`}>
                  <Image
                    src={
                      item.images.webp.image_url ||
                      item.images.jpg.image_url ||
                      '/not-found-image.jpeg'
                    }
                    height={70}
                    width={50}
                    alt={item.name}
                  />
                </Link>
                <div className={styles.searchModal__info}>
                  <Link href={`/characters/${item.mal_id}`}>
                    <p className={styles.searchModal__title}>{item.name}</p>
                    <p className={styles.searchModal__titleJap}>
                      {item.name_kanji}
                    </p>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      );
    }
  };

  return (
    <div className={focus ? styles.searchModal : styles.hideModal}>
      <div className={styles.searchModal__body}>
        {checkList(animeList)}
        {checkList(mangaList)}
        {checkCharactersList(charactersList)}
        {checkNoResults()}
      </div>
    </div>
  );
}
