import styles from './RelationsBlock.module.scss';
import { ISingleAnimeRelation } from '@/types/IAnimeRelations';
import RelationsItem from '../RelationsItem/RelationsItem';

export default function RelationsBlock({
  isLoading,
  relations,
}: {
  isLoading: boolean;
  relations: ISingleAnimeRelation[] | undefined;
}) {
  return (
    <div className={styles.relations}>
      <p className={styles.relations__title}>Relations</p>
      <nav>
        <ul className={styles.relations__list}>
          {isLoading && <div>Loading...</div>}
          {relations &&
            relations.map((relation) =>
              relation.entry.map((item) => (
                <RelationsItem
                  key={item.name}
                  item={item}
                  relation={relation}
                />
              ))
            )}
        </ul>
      </nav>
    </div>
  );
}
