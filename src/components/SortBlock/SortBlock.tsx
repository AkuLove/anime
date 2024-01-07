import { sortOptions } from '@/constants';
import SingleDropdown from '../UI/SingleDropdownSelect/SingleDropdownSelect';
import styles from './SortBlock.module.scss';

export default function SortBlock() {
  return (
    <div
      className={styles.sortBlock}
    >
        <span>Sort by:</span>
        <div className={styles.dropdown}>
        <SingleDropdown placeHolder='Popularity' queryParam='order_by' options={sortOptions}/>
        </div>
    </div>
  );
}
