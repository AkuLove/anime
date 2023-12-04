import styles from './DefaultButton.module.scss';

export default function DefaultButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${className && styles[className]}`}
    >
      {children}
    </button>
  );
}
