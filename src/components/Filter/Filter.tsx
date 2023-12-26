'use client';

import { filterOptions } from '@/constants';
import Dropdown from '../UI/DropdownSelect/DropdownSelect';
import styles from './Filter.module.scss';

export default function Filter() {
  return (
    <div className={styles.filter}>
      <Dropdown placeHolder="Select..." options={filterOptions} isMulti />
      <Dropdown placeHolder="Select..." options={filterOptions} isMulti />
    </div>
  );
}
