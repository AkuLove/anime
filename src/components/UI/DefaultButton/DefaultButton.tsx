import styles from './DefaultButton.module.scss';

export default function DefaultButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={styles.button}>
      {children}
    </button>
  );
}
