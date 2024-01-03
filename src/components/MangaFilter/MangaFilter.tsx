'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  mangaFilterOptions,
  mangaStatusOptions,
  mangaTypeOptions,
} from '@/constants';
import styles from './MangaFilter.module.scss';
import MultiDropdown from '../UI/MultiDropdownSelect/MultiDropdownSelect';
import SingleDropdown from '../UI/SingleDropdownSelect/SingleDropdownSelect';

export default function MangaFilter() {
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
            options={mangaFilterOptions}
            queryParam="genres"
          />
        </div>
        <div className={styles.dropdown}>
          <p className={styles.dropdown__title}>Type</p>
          <SingleDropdown
            placeHolder="Select type"
            options={mangaTypeOptions}
            queryParam="type"
          />
        </div>
        <div className={styles.dropdown}>
          <p className={styles.dropdown__title}>Status</p>
          <SingleDropdown
            placeHolder="Select status"
            options={mangaStatusOptions}
            queryParam="status"
          />
        </div>
      </div>
    </div>
  );
}
