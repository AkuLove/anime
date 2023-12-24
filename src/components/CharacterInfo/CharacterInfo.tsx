import Image from 'next/image';
import styles from './CharacterInfo.module.scss';
import { ISingleCharacterFull } from '@/types/ICharacters';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function CharacterInfo({
  item,
}: {
  item: ISingleCharacterFull;
}) {
  const imageWebp = item.images.webp.image_url;
  const imageJpg = item.images.jpg.image_url;
  const info = useAppSelector((state) => state.charaters.characterInfo);
  const propertys = Object.keys(info);
  const values = Object.values(info);

  return (
    <div className={styles.item}>
      <div className={styles.item__body}>
        <p className={styles.name}>
          {item.name}
          {item.name_kanji && (
            <span className={styles.name__jap}> ({item.name_kanji})</span>
          )}
        </p>
        <Image
          src={imageWebp || imageJpg || '/not-found-image.jpeg'}
          width={220}
          height={310}
          alt={item.name}
        />
        <div className={styles.names}>
          {item.nicknames.map((name) => (
            <p className={styles.nickname} key={name}>
              {name}
            </p>
          ))}
        </div>
        <div>
          {propertys.map((property, i) => (
            <div key={property} className={styles.info}>
              {!property.includes('Source') && (
                <div className={styles.info__body}>
                  <p className={styles.info__title}>{property}</p>
                  <div className={styles.info__list}>
                    {values[i].split(';').map((value) => (
                      <p key={value} className={styles.info__specs}>
                        {value}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
