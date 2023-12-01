import styles from "./DefaultInput.module.scss";

export default function DefaultInput({ placeholder }: { placeholder: string }) {
  return (
    <input className={styles.input} type="text" placeholder={placeholder} />
  );
}
