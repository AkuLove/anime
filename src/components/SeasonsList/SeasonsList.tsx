'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './SeasonsList.module.scss';
import { useGetSeasonListQuery } from '@/services/listApi';
import Loader from '../UI/Loader/Loader';
import ShowMoreButton from '../UI/ShowMoreButton/ShowMoreButton';

export default function SeasonsList({ type }: { type: 'now' | 'upcoming' }) {
  const { data, isLoading } = useGetSeasonListQuery(type);
  const animeList = data?.data;
  const [active, setActive] = useState(false);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.seasons}>
        <ul
          className={
            !active
              ? styles.seasons__list
              : `${styles.seasons__list} ${styles.active}`
          }
        >
          {animeList &&
            animeList.map((anime) => (
              <li key={anime.mal_id} className={styles.seasons__anime}>
                {anime.score > 0 && (
                  <div className={styles.rating}>
                    <Image
                      src="/ratingStar.svg"
                      width={30}
                      height={30}
                      alt="rating"
                    />
                    {Math.round(anime.score * 10) / 10}
                  </div>
                )}
                <Link href={`/anime/${anime.mal_id}`}>
                  <Image
                    src={
                      anime.images.webp.large_image_url ||
                      anime.images.jpg.large_image_url ||
                      '/not-found-image.jpeg'
                    }
                    className={styles.seasons__logo}
                    alt={anime.title}
                    width={162}
                    height={226}
                  />
                </Link>
                <Link href={`/anime/${anime.mal_id}`}>
                  <p className={styles.seasons__title}>{anime.title_english}</p>
                </Link>
              </li>
            ))}
          <ShowMoreButton active={active} setActive={setActive} />
        </ul>
      </div>
    </>
  );
}
