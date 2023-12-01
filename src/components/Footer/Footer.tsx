import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__body}>
          <div className={styles.github}>
            <Link
              href="https://github.com/AkuLove"
              className={styles.github__body}
            >
              <Image
                src="/github-mark.svg"
                width={40}
                height={40}
                alt="github logo"
              />
              <p>AkuLove</p>
            </Link>
          </div>
          <p className={styles.date}>
            {date !== 2023 ? `©AkuAnime 2023 - ${date}` : '©AkuAnime 2023'}
          </p>
        </div>
      </div>
    </footer>
  );
}
