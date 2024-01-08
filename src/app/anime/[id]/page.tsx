'use client';

import MediaBlock from '@/components/MediaBlock/MediaBlock';
import styles from './page.module.scss';
import {
  useGetSingleAnimeQuery,
  useGetAnimeRelationsQuery,
  useGetAnimeCharactersQuery,
} from '@/services/animeApi';
import NotFoundImage from '../../../../public/not-found-image.jpeg';
import DescriptionBlock from '@/components/DescriptionBlock/DescriptionBlock';
import RelationsBlock from '@/components/RelationsBlock/RelationsBlock';
import CharactersBlock from '@/components/CharactersBlock/CharactersBlock';
import Loader from '@/components/UI/Loader/Loader';

export default function SingleAnime({ params }: { params: { id: string } }) {
  const { data: singleAnimeData, isLoading: isSingleAnimeLoading } =
    useGetSingleAnimeQuery({ id: params.id });
  const { data: animeRelations, isLoading: isAnimeRelationsLoading } =
    useGetAnimeRelationsQuery(params.id);
  const { data: animeCharacters, isLoading: isAnimeCharactersLoading } =
    useGetAnimeCharactersQuery(params.id);

  const relations = animeRelations?.data;
  const characters = animeCharacters?.data;
  const anime = singleAnimeData?.data;
  const imageWebp = anime?.images.webp.large_image_url;
  const imageJpg = anime?.images.jpg.large_image_url;

  return (
    <div>
      {isSingleAnimeLoading && <Loader />}
      {anime && (
        <div className={styles.anime__content}>
          <div className={styles.anime__body}>
            <MediaBlock
              title={anime.title}
              image={imageWebp || imageJpg || NotFoundImage}
              id={anime.mal_id}
              type="anime"
            />
            <DescriptionBlock item={anime} type="anime" />
          </div>
          <p className={styles.synopsis}>
            {anime.synopsis &&
              anime.synopsis
                .replace('[Written by MAL Rewrite]', '')
                .replace('(Source: Funimation)', '')}
          </p>
          <RelationsBlock
            isLoading={isAnimeRelationsLoading}
            relations={relations}
          />
          <CharactersBlock
            characters={characters}
            isLoading={isAnimeCharactersLoading}
          />
          <div />
        </div>
      )}
    </div>
  );
}
