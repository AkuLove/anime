import type { Dispatch, SetStateAction } from 'react';
import styles from './ShowMoreButton.module.scss';

export default function ShowMoreButton({
  active,
  setActive,
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={
        !active ? styles.showMore : `${styles.showMore} ${styles.hidden}`
      }
    >
      <button
        className={
          !active
            ? styles.showMore__button
            : `${styles.showMore__button} ${styles.hidden}`
        }
        type="button"
        onClick={() => setActive((prev) => !prev)}
      >
        Show more
      </button>
    </div>
  );
}
