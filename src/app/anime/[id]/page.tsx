'use client';

import MediaBlock from '@/components/MediaBlock/MediaBlock';
import styles from './page.module.scss';
import { useGetSingleAnimeQuery } from '@/services/animeApi';
import NotFoundImage from '../../../../public/not-found-image.jpeg';
import DescriptionBlock from '@/components/DescriptionBlock/DescriptionBlock';

export default function SingleAnime({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetSingleAnimeQuery({
    id: params.id,
    type: 'anime',
  });
  const anime = data?.data;
  const imageWebp = anime?.images.webp.large_image_url;
  const imageJpg = anime?.images.jpg.large_image_url;

  return (
    <main className={styles.anime}>
      <div className="container">
        {isLoading && <div>Loading...</div>}
        {anime && (
          <div className={styles.anime__body}>
            <MediaBlock
              title={anime.title}
              image={imageWebp || imageJpg || NotFoundImage}
            />
            <DescriptionBlock item={anime} />
          </div>
        )}
      </div>
    </main>
  );
}
