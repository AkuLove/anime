import { useState } from 'react';
import styles from './RelationsBlock.module.scss';
import { ISingleAnimeRelation } from '@/types/IAnimeRelations';
import RelationsItem from '../RelationsItem/RelationsItem';
import Loader from '../UI/Loader/Loader';
import ShowMoreButton from '../UI/ShowMoreButton/ShowMoreButton';

export default function RelationsBlock({
  isLoading,
  relations,
}: {
  isLoading: boolean;
  relations: ISingleAnimeRelation[] | undefined;
}) {
  const [active, setActive] = useState(false);
  return (
    <div className={styles.relations}>
      {relations?.length !== 0 && (
        <>
          <p className={styles.relations__title}>Relations</p>
          <nav className={styles.relations__list_body}>
            <ul
              className={
                !active && relations && relations.length > 4
                  ? styles.relations__list
                  : `${styles.relations__list} ${styles.active}`
              }
            >
              {isLoading && <Loader />}
              {relations &&
                relations.map((relation) =>
                  relation.entry.map(
                    (item) =>
                      item.name && (
                        <RelationsItem
                          key={item.mal_id}
                          item={item}
                          relation={relation}
                        />
                      )
                  )
                )}
              {relations && relations.length > 4 && (
                <ShowMoreButton active={active} setActive={setActive} />
              )}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
