'use client';

import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import styles from './SingleDropdownSelect.module.scss';
import Icon from '../SVG/Icon';
import { IFilterItem } from '@/types/ICommon';
import useDebounce from '@/hooks/useDebounce';

export default function SingleDropdown({
  placeHolder,
  options,
  queryParam,
}: {
  placeHolder: string;
  options: IFilterItem[];
  queryParam: string;
}) {
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();
  const checkSelectedOptionsFromUrl = () => {
    const selectedValues: IFilterItem[] = [];
    if (params.slug !== undefined && Array.isArray(params.slug)) {
      const newParams = params.slug.map((param) => {
        let filteredParam = param.replace('-is-', ' ');
        filteredParam = filteredParam.replaceAll('-or-', ' ');
        return filteredParam;
      });
      newParams.forEach((param) => {
        const innerParams = param.split(' ');
        if (innerParams[0] === queryParam) {
          options.forEach((option) => {
            if (innerParams[1].replaceAll('%20', ' ') === option.mal_id) {
              selectedValues.push(option);
            }
          });
        }
      });
    }
    if (selectedValues[0]) {
      return selectedValues[0];
    }
    return null;
  };
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IFilterItem | null>(
    checkSelectedOptionsFromUrl()
  );
  const inputRef: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (!pathName.includes(queryParam)) {
      setSelectedValue(checkSelectedOptionsFromUrl());
    }
  }, [pathName]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
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

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.name;
    }
    return placeHolder;
  };

  const onItemClick = (option: IFilterItem) => {
    if (selectedValue?.mal_id !== option.mal_id) {
      setSelectedValue(option);
    } else {
      setSelectedValue(null);
    }
  };

  const isSelected = (option: IFilterItem) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.mal_id === option.mal_id;
  };

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const setQueryParams = (filterItem: IFilterItem | null) => {
    const query: string[] = [];
    if (filterItem) {
      query.push(`${queryParam}-is-${filterItem.mal_id}`);
    }
    const queryString = query[0];
    if (params.slug === undefined && filterItem) {
      router.push(`${pathName}/filter/${queryString}`);
    } else if (Array.isArray(params.slug)) {
      let newPathName = pathName;
      params.slug.forEach((item) => {
        const splittedItem = item.split('-is-');
        if (splittedItem[0] === queryParam && queryString) {
          newPathName = newPathName.replace(item, queryString);
        } else if (splittedItem[0] === queryParam && !queryString) {
          newPathName = newPathName.replace(item, '');
        }
      });
      if (newPathName !== pathName) {
        router.push(newPathName);
      } else if (queryString) {
        router.push(`${pathName}/${queryString}`);
      }
    }
  };

  useDebounce(() => setQueryParams(selectedValue), 1000, [selectedValue]);

  return (
    <div className={styles.dropdown}>
      <div
        onClick={handleInputClick}
        role="presentation"
        className={styles.dropdown__input}
        ref={inputRef}
      >
        <div className={styles.dropdown__selected_value}>{getDisplay()}</div>
        <div className={styles.dropdown__tools}>
          <div
            className={
              !showMenu
                ? styles.dropdown__tool
                : `${styles.dropdown__tool} ${styles.rotate}`
            }
          >
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={styles.dropdown__menu}>
          {options.map((option) => (
            <button
              key={option.mal_id}
              type="button"
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
