import React, { useEffect, useState } from 'react';
import styles from './DescriptionBlock.module.scss';
import { IAnimeDescriptions, ISingleAnime } from '@/types/IAnime';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { checkValidAnimeDescription } from '@/store/AnimeSlice';
import { checkValidMangaDescription } from '@/store/MangaSlice';
import { IMangaDescriptions, ISingleManga } from '@/types/IManga';
import { IGenres } from '@/types/ICommon';
import RatingBlock from '../RatingBlock/RatingBlock';

export default function DescriptionBlock({
  item,
  type,
}: {
  item: ISingleAnime | ISingleManga;
  type: 'anime' | 'manga';
}) {
  const titleEng = item.title_english;
  const titleJap = item.title_japanese;
  const dispatch = useAppDispatch();
  const animeDescriptions = useAppSelector((state) => state.anime.descriptions);
  const mangaDescriptions = useAppSelector((state) => state.manga.descriptions);
  const [key, setKey] = useState<string[] | null>(null);

  useEffect(() => {
    if (type === 'anime') {
      item = item as ISingleAnime;
      dispatch(checkValidAnimeDescription(item));
      setKey(Object.keys(animeDescriptions));
    } else {
      item = item as ISingleManga;
      dispatch(checkValidMangaDescription(item));
      setKey(Object.keys(mangaDescriptions));
    }
  }, []);

  const checkAnimeOrManga = (
    checkedItem: IAnimeDescriptions | IMangaDescriptions
  ) => {
    return (
      key &&
      Object.values(checkedItem).map(
        (description: string | IGenres[], index) =>
          description !== null && !Array.isArray(description) ? (
            <div key={key[index]} className={styles.description}>
              <p className={styles.description__title}>{key[index]}</p>
              <p className={styles.description__value}>{description}</p>
            </div>
          ) : (
            <div key={key[index]} className={styles.description}>
              <p className={styles.description__title}>{key[index]}</p>
              <p className={styles.description__value}>
                {description.map((arrayDescription) => (
                  <span key={arrayDescription.id}>{arrayDescription.name}</span>
                ))}
              </p>
            </div>
          )
      )
    );
  };

  return (
    <div className={styles.descriptionBlock}>
      {item.score && (
        <RatingBlock
          type={type}
          id={item.mal_id}
          score={item.score}
          scoredBy={item.scored_by}
        />
      )}
      <div className={styles.titles}>
        <h1 className={styles.main__title}>{item.title}</h1>
        {titleEng && <h2 className={styles.second__title}>{titleEng}</h2>}
        {titleJap && <h3 className={styles.second__title}>{titleJap}</h3>}
      </div>
      <div className={styles.descriptions}>
        {type === 'anime'
          ? checkAnimeOrManga(animeDescriptions)
          : checkAnimeOrManga(mangaDescriptions)}
      </div>
    </div>
  );
}
