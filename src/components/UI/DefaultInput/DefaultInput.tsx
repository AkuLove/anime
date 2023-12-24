import type { Dispatch, SetStateAction } from 'react';
import styles from './DefaultInput.module.scss';

export default function DefaultInput({
  placeholder,
  setSearch,
  setFocus,
  searchValue,
}: {
  placeholder: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setFocus: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
}) {
  return (
    <input
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={searchValue}
      className={styles.input}
      type="text"
      placeholder={placeholder}
    />
  );
}
