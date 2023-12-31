'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  animeFilterOptions,
  animeRatingOptions,
  animeStatusOptions,
  animeTypeOptions,
} from '@/constants';
import styles from './AnimeFilter.module.scss';
import MultiDropdown from '../UI/MultiDropdownSelect/MultiDropdownSelect';
import SingleDropdown from '../UI/SingleDropdownSelect/SingleDropdownSelect';

export default function AnimeFilter() {
  const params = useParams();
  return (
    <div className={!params.id ? styles.filter : styles.filter__hidden}>
      <p className={styles.filter__title}>
        <Image src="/filter.svg" width={18} height={18} alt="filter icon" />
        <span>Filter</span>
      </p>
      <div className={styles.filter__body}>
        <div className={styles.dropdown}>
          <p className={styles.dropdown__title}>Genres</p>
          <MultiDropdown
            placeHolder="Select genre"
            options={animeFilterOptions}
            queryParam="genres"
          />
        </div>
        <div className={styles.dropdown}>
          <p className={styles.dropdown__title}>Type</p>
          <SingleDropdown
            placeHolder="Select type"
            options={animeTypeOptions}
            queryParam="type"
          />
        </div>
        <div className={styles.dropdown}>
          <p className={styles.dropdown__title}>Status</p>
          <SingleDropdown
            placeHolder="Select status"
            options={animeStatusOptions}
            queryParam="status"
          />
        </div>
        <div className={styles.dropdown}>
          <p className={styles.dropdown__title}>Age limit</p>
          <SingleDropdown
            placeHolder="Select rating"
            options={animeRatingOptions}
            queryParam="rating"
          />
        </div>
      </div>
    </div>
  );
}
