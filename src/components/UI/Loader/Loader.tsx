import Image from 'next/image';
import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.loader__container}>
      <Image
        className={styles.loader}
        src="/loading.gif"
        alt="loader"
        width={40}
        height={40}
      />
    </div>
  );
}
