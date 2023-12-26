import React, { useEffect, useState } from 'react';
import styles from './DropdownSelect.module.scss';
import { IFilterItem } from '@/types/ICommon';
import CloseIcon from '../SVG/CloseIcon';
import Icon from '../SVG/Icon';

export default function Dropdown({
  placeHolder,
  options,
  isMulti = false,
}: {
  placeHolder: string;
  options: IFilterItem[];
  isMulti?: boolean;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    null | IFilterItem | IFilterItem[]
  >(isMulti ? [] : null);
  const inputRef: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !(e.target instanceof HTMLButtonElement) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const checkTypes = (
    option: IFilterItem | IFilterItem[] | null
  ): option is IFilterItem[] => {
    return isMulti;
  };

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const removeOption = (option: IFilterItem) => {
    if (checkTypes(selectedValue)) {
      return selectedValue.filter((o) => o.mal_id !== option.mal_id);
    }
    return selectedValue;
  };
  const onTagRemove = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    option: IFilterItem
  ) => {
    e.stopPropagation();
    setSelectedValue(removeOption(option));
  };

  const getDisplay = () => {
    if (
      !selectedValue ||
      (checkTypes(selectedValue) && selectedValue.length === 0)
    ) {
      return placeHolder;
    }
    if (isMulti && checkTypes(selectedValue)) {
      return (
        <div className={styles.dropdown__tags}>
          {selectedValue.map((option) => (
            <div key={option.mal_id} className={styles.dropdown__tag_item}>
              {option.name}
              <span
                role="presentation"
                onClick={(e) => onTagRemove(e, option)}
                className={styles.dropdown__tag_close}
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
    if (!checkTypes(selectedValue)) {
      return selectedValue.name;
    }
  };

  const onItemClick = (option: IFilterItem) => {
    let newValue;
    if (isMulti && checkTypes(selectedValue)) {
      if (selectedValue.findIndex((o) => o.mal_id === option.mal_id) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
  };

  const isSelected = (option: IFilterItem) => {
    if (isMulti && checkTypes(selectedValue)) {
      return selectedValue.filter((o) => o.mal_id === option.mal_id).length > 0;
    }
    if (!selectedValue) {
      return false;
    }

    if (!checkTypes(selectedValue)) {
      return selectedValue.mal_id === option.mal_id;
    }
  };

  return (
    <div className={styles.dropdown}>
      <div
        role="presentation"
        onClick={handleInputClick}
        className={styles.dropdown__input}
        ref={inputRef}
      >
        <div className={styles.dropdown__selected_value}>{getDisplay()}</div>
        <div className={styles.dropdown__tools}>
          <div className={styles.dropdown__tool}>
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={styles.dropdown__menu}>
          {options.map((option) => (
            <button
              type="button"
              key={option.mal_id}
              onClick={() => onItemClick(option)}
              className={`${styles.dropdown__item} ${
                isSelected(option) && styles.selected
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
