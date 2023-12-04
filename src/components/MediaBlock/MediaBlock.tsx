import Image, { StaticImageData } from 'next/image';
import styles from './MediaBlock.module.scss';
import DefaultButton from '../UI/DefaultButton/DefaultButton';

export default function MediaBlock({
  image,
  title,
}: {
  image: string | StaticImageData;
  title: string;
}) {
  return (
    <div className={styles.mediaBlock}>
      <Image
        className={styles.image}
        src={image}
        width={250}
        height={350}
        alt={title}
      />
      <div className={styles.buttons__block}>
        <DefaultButton className="">▶ Watch online</DefaultButton>
        <DefaultButton className="white">🖊️ Write a review</DefaultButton>
      </div>
    </div>
  );
}
