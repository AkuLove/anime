import React from 'react';
import { descriptions } from '@/constants';
import styles from './DescriptionBlock.module.scss';
import { ISingleAnime } from '@/types/IAnime';

export default function DescriptionBlock({ item }: { item: ISingleAnime }) {
  const titleEng = item.title_english;
  const titleJap = item.title_japanese;

  const checkDescription = (description: string) => {
    switch (description) {
      case 'studios':
        if (item[description]) {
          return (
            <>
              <p className={styles.description__title}>{description}</p>
              <p className={styles.description__value}>
                {item[description] &&
                  item[description].map((studio) => <span>{studio.name}</span>)}
              </p>
            </>
          );
        }
        return '';
      case 'authors':
        if (item[description]) {
          return (
            <>
              <p className={styles.description__title}>{description}</p>
              <p className={styles.description__value}>
                {item[description] &&
                  item[description].map((studio) => <span>{studio.name}</span>)}
              </p>
            </>
          );
        }
        return '';
      case 'genres':
        if (item[description]) {
          return (
            <>
              <p className={styles.description__title}>{description}</p>
              <p className={styles.description__value}>
                {item[description] &&
                  item[description].map((genre) => <span>{genre.name}</span>)}
                {item.themes &&
                  item.themes.map((theme) => <span>{theme.name}</span>)}
              </p>
            </>
          );
        }
        return '';
      case 'aired':
        if (item[description]) {
          return (
            <>
              <p className={styles.description__title}>{description}</p>
              <p className={styles.description__value}>
                {item[description] && item[description].string}
              </p>
            </>
          );
        }
        return '';

      default:
        return '';
    }
  };

  return (
    <div className={styles.descriptionBlock}>
      <div className={styles.titles}>
        <h1 className={styles.main__title}>{item.title}</h1>
        {titleEng && <h2 className={styles.main__title}>{titleEng}</h2>}
        {titleJap && <h3 className={styles.main__title}>{titleJap}</h3>}
      </div>
      <div className={styles.descriptions}>
        {descriptions.map((description) =>
          description in item &&
          item[description as keyof typeof item] !== null &&
          typeof item[description as keyof typeof item] !== 'object' ? (
            <div className={styles.description}>
              <p className={styles.description__title}>{description}</p>
              <p className={styles.description__value}>
                {item[description as keyof typeof item] as React.ReactNode}
              </p>
            </div>
          ) : (
            <div className={styles.description}>
              {checkDescription(description)}
            </div>
          )
        )}
      </div>
    </div>
  );
}
