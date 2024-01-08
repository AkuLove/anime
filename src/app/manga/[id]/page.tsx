'use client';

import MediaBlock from '@/components/MediaBlock/MediaBlock';
import styles from './page.module.scss';
import NotFoundImage from '../../../../public/not-found-image.jpeg';
import DescriptionBlock from '@/components/DescriptionBlock/DescriptionBlock';
import {
  useGetMangaCharactersQuery,
  useGetMangaRelationsQuery,
  useGetSingleMangaQuery,
} from '@/services/mangaApi';
import RelationsBlock from '@/components/RelationsBlock/RelationsBlock';
import CharactersBlock from '@/components/CharactersBlock/CharactersBlock';
import Loader from '@/components/UI/Loader/Loader';

export default function SingleManga({ params }: { params: { id: string } }) {
  const { data: singleMangaData, isLoading: isSingleMangaLoading } =
    useGetSingleMangaQuery({ id: params.id });
  const { data: mangaRelations, isLoading: isMangaRelationsLoading } =
    useGetMangaRelationsQuery(params.id);
  const { data: mangaCharacters, isLoading: isMangaCharactersLoading } =
    useGetMangaCharactersQuery(params.id);

  const characters = mangaCharacters?.data;
  const relations = mangaRelations?.data;
  const manga = singleMangaData?.data;
  const imageWebp = manga?.images.webp.large_image_url;
  const imageJpg = manga?.images.jpg.large_image_url;

  return (
    <main className={styles.manga}>
      <div className="container">
        {isSingleMangaLoading && <Loader />}
        {manga && (
          <div className={styles.manga__content}>
            <div className={styles.manga__body}>
              <MediaBlock
                title={manga.title}
                image={imageWebp || imageJpg || NotFoundImage}
                id={manga.mal_id}
                type="manga"
              />
              <DescriptionBlock item={manga} type="manga" />
            </div>
            <p className={styles.synopsis}>
              {manga.synopsis &&
                manga.synopsis
                  .replace('[Written by MAL Rewrite]', '')
                  .replace('(Source: Funimation)', '')}
            </p>
            <RelationsBlock
              isLoading={isMangaRelationsLoading}
              relations={relations}
            />
            <CharactersBlock
              characters={characters}
              isLoading={isMangaCharactersLoading}
            />
          </div>
        )}
      </div>
    </main>
  );
}
