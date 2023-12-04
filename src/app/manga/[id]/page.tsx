'use client';

import MediaBlock from '@/components/MediaBlock/MediaBlock';
import styles from './page.module.scss';
import { useGetSingleAnimeQuery } from '@/services/animeApi';
import NotFoundImage from '../../../../public/not-found-image.jpeg';
import DescriptionBlock from '@/components/DescriptionBlock/DescriptionBlock';

export default function SingleManga({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetSingleAnimeQuery({
    id: params.id,
    type: 'manga',
  });
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
            <DescriptionBlock item={manga} />
          </div>
        )}
      </div>
    </main>
  );
}
