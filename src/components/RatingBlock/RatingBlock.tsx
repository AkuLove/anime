import Image from 'next/image';
import styles from './RatingBlock.module.scss';
import ratingStar from '../../../public/ratingStar.svg';

export default function RatingBlock({
  score,
  scoredBy,
}: {
  score: number;
  scoredBy: number;
}) {
  return (
    <div className={styles.rating}>
      <Image src={ratingStar} width={32} height={36} alt="rating star" />
      <div className={styles.stats}>
        <p>
          <span>{Math.round(score * 10) / 10}</span>/10
        </p>
        <p>{scoredBy}</p>
      </div>
    </div>
  );
}
