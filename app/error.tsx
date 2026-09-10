"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h1>😢 Oops!</h1>

      <p>Something went wrong.</p>

      <button
        onClick={() => reset()}
        className={styles.button}
      >
        Try Again
      </button>
    </div>
  );
}