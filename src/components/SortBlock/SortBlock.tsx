'use client';

import { useParams } from 'next/navigation';
import { sortOptions } from '@/constants';
import SingleDropdown from '../UI/SingleDropdownSelect/SingleDropdownSelect';
import styles from './SortBlock.module.scss';

export default function SortBlock() {
  const params = useParams();
  return (
    <div
      className={
        !params.id ? styles.sortBlock : `${styles.sortBlock} ${styles.hidden}`
      }
    >
      <span>Sort by:</span>
      <div className={styles.dropdown}>
        <SingleDropdown
          placeHolder="Popularity"
          queryParam="order_by"
          options={sortOptions}
        />
      </div>
    </div>
  );
}
