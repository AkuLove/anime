'use client';

import MediaBlock from '@/components/MediaBlock/MediaBlock';
import styles from './page.module.scss';
import NotFoundImage from '../../../../public/not-found-image.jpeg';
import DescriptionBlock from '@/components/DescriptionBlock/DescriptionBlock';
import { useGetSingleMangaQuery } from '@/services/mangaApi';

export default function SingleManga({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetSingleMangaQuery(params.id);
  const manga = data?.data;
  const imageWebp = manga?.images.webp.large_image_url;
  const imageJpg = manga?.images.jpg.large_image_url;

  return (
    <main className={styles.manga}>
      <div className="container">
        {isLoading && <div>Loading...</div>}
        {manga && (
          <div className={styles.manga__body}>
            <MediaBlock
              title={manga.title}
              image={imageWebp || imageJpg || NotFoundImage}
            />
            <DescriptionBlock item={manga} type="manga" />
          </div>
        )}
      </div>
    </main>
  );
}
