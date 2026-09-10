import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>

      <h2 className={styles.text}>
        Loading Movies...
      </h2>
    </div>
  );
}