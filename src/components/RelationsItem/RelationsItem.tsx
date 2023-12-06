import Image from 'next/image';
import Link from 'next/link';
import { useGetSingleAnimeQuery } from '@/services/animeApi';
import styles from './RelationsItem.module.scss';
import { IItem } from '@/types/ICommon';
import { ISingleAnimeRelation } from '@/types/IAnimeRelations';
import notFoundImage from '../../../public/not-found-image.jpeg';

export default function RelationsItem({
  relation,
  item,
}: {
  relation: ISingleAnimeRelation;
  item: IItem;
}) {
  const { data, isLoading } = useGetSingleAnimeQuery({
    id: item.mal_id.toString(),
    type: item.type,
  });
  const imageWebp = data?.data.images.webp.image_url;
  const imageJpg = data?.data.images.jpg.image_url;
  const releaseDate = data?.data.year;

  return (
    <li className={styles.relationItem}>
      <Link
        href={
          item.type === 'anime'
            ? `/anime/${item.mal_id}`
            : `/manga/${item.mal_id}`
        }
        className={styles.relationItem__name}
      >
        {item.name}
      </Link>
      <div className={styles.relationItem__body}>
        {isLoading && <div>loading...</div>}
        {!isLoading && (
          <Link
            href={
              item.type === 'anime'
                ? `/anime/${item.mal_id}`
                : `/manga/${item.mal_id}`
            }
          >
            <Image
              src={imageWebp || imageJpg || notFoundImage}
              alt={item.name}
              width={80}
              height={120}
            />
          </Link>
        )}
        <p className={styles.info}>
          <span>
            {item.type} {releaseDate && `/ ${releaseDate}`}
          </span>
          <span>{relation.relation}</span>
        </p>
      </div>
    </li>
  );
}
