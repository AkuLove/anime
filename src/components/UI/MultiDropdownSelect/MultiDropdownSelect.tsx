import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import styles from './MultiDropdownSelect.module.scss';
import { IFilterItem } from '@/types/ICommon';
import CloseIcon from '../SVG/CloseIcon';
import Icon from '../SVG/Icon';
import useDebounce from '@/hooks/useDebounce';

export default function MultiDropdown({
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
            innerParams.forEach((innerParam) => {
              innerParam = innerParam.replaceAll('%20', ' ');
              if (option.mal_id.toString() === innerParam) {
                selectedValues.push(option);
              }
            });
          });
        }
      });
    }
    return selectedValues;
  };

  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IFilterItem[]>(
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
    if (params.slug === undefined && pathName.includes('filter')) {
      router.push(pathName.replace('filter', ''));
    }
  }, [params]);

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

  const setQueryParams = (filterList: IFilterItem[]) => {
    const query: string[] = [];
    filterList.forEach((item, index) => {
      if (index === 0) {
        query.push(`${queryParam}-is-${item.mal_id}`);
      } else {
        query.push(item.mal_id.toString());
      }
    });
    const queryString = query.join('-or-');
    if (params.slug === undefined && filterList.length) {
      router.push(`${pathName}/filter/${queryString}`);
    } else if (Array.isArray(params.slug)) {
      let newPathName = pathName;
      params.slug.forEach((item) => {
        const splittedItem = item.split('-is-');
        if (splittedItem[0] === queryParam) {
          newPathName = newPathName.replace(item, queryString);
        }
      });
      if (newPathName !== pathName) {
        router.push(newPathName);
      } else {
        router.push(`${pathName}/${queryString}`);
      }
    }
  };

  useDebounce(() => setQueryParams(selectedValue), 800, [selectedValue]);

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const removeOption = (option: IFilterItem) => {
    return selectedValue.filter((o) => o.mal_id !== option.mal_id);
  };

  const onTagRemove = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    option: IFilterItem
  ) => {
    e.stopPropagation();
    setSelectedValue(removeOption(option));
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
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
  };

  const onItemClick = (option: IFilterItem) => {
    let newValue;
    if (selectedValue.findIndex((o) => o.mal_id === option.mal_id) >= 0) {
      newValue = removeOption(option);
    } else {
      newValue = [...selectedValue, option];
    }
    setSelectedValue(newValue);
  };

  const isSelected = (option: IFilterItem) => {
    return selectedValue.filter((o) => o.mal_id === option.mal_id).length > 0;
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
