'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './RatingBlock.module.scss';
import RatingStats from '../RatingStats/RatingStats';

export default function RatingBlock({
  score,
  scoredBy,
  type,
  id,
}: {
  score: number;
  scoredBy: number;
  type: 'anime' | 'manga';
  id: number;
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className={styles.ratingBlock}>
      <div className={styles.rating}>
        <Image src="/ratingStar.svg" width={32} height={36} alt="rating star" />
        <div className={styles.stats}>
          <p>
            <span>{Math.round(score * 10) / 10}</span>/10
          </p>
          <p>{scoredBy}</p>
        </div>
      </div>
      <p
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={styles.peoplesList}
      >
        People&apos;s ratings
      </p>
      {hovering && (
        <RatingStats type={type} id={id.toString()} title="People's ratings" />
      )}
    </div>
  );
}
