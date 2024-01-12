'use client';

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import styles from './MediaBlock.module.scss';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
import StatisticsBlock from '../StatisticsBlock/StatisticsBlock';

export default function MediaBlock({
  image,
  title,
  id,
  type,
}: {
  image: string | StaticImageData;
  title: string;
  id: number;
  type: 'anime' | 'manga';
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className={styles.mediaBlock}>
      <Image
        className={styles.image}
        src={image}
        width={250}
        height={370}
        alt={title}
      />
      <div className={styles.buttons__block}>
        <DefaultButton className="">▶ Watch online</DefaultButton>
        <DefaultButton className="white">🖊️ Write a review</DefaultButton>
        <p
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className={styles.peoplesList}
        >
          On people&apos;s lists
        </p>
        {hovering && (
          <StatisticsBlock
            type={type}
            id={id.toString()}
            title="On people's lists"
          />
        )}
      </div>
    </div>
  );
}
