'use client';

import MediaBlock from '@/components/MediaBlock/MediaBlock';
import styles from './page.module.scss';
import NotFoundImage from '../../../../public/not-found-image.jpeg';
import DescriptionBlock from '@/components/DescriptionBlock/DescriptionBlock';
import {
  useGetMangaRelationsQuery,
  useGetSingleMangaQuery,
} from '@/services/mangaApi';
import RelationsBlock from '@/components/RelationsBlock/RelationsBlock';

export default function SingleManga({ params }: { params: { id: string } }) {
  const { data: singleMangaData, isLoading: isSingleMangaLoading } =
    useGetSingleMangaQuery({ id: params.id });
  const { data: mangaRelations, isLoading: isMangaRelationsLoading } =
    useGetMangaRelationsQuery(params.id);

  const relations = mangaRelations?.data;
  const manga = singleMangaData?.data;
  const imageWebp = manga?.images.webp.large_image_url;
  const imageJpg = manga?.images.jpg.large_image_url;

  return (
    <main className={styles.manga}>
      <div className="container">
        {isSingleMangaLoading && <div>Loading...</div>}
        {manga && (
          <div className={styles.manga__content}>
            <div className={styles.manga__body}>
              <MediaBlock
                title={manga.title}
                image={imageWebp || imageJpg || NotFoundImage}
              />
              <DescriptionBlock item={manga} type="manga" />
            </div>
            <p className={styles.synopsis}>
              {manga.synopsis
                .replace('[Written by MAL Rewrite]', '')
                .replace('(Source: Funimation)', '')}
            </p>
            <RelationsBlock
              isLoading={isMangaRelationsLoading}
              relations={relations}
            />
          </div>
        )}
      </div>
    </main>
  );
}
