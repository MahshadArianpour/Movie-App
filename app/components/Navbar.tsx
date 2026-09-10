"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

interface Props {
  favoriteCount: number;
}

export default function Navbar({
  favoriteCount,
}: Props) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

   if (theme === "dark") {
    document.documentElement.classList.add("dark");
    setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>
        🎬 MovieApp
      </h1>

      <div className={styles.links}>
        <Link href="/">🏠 Home</Link>

        <Link href="/favorites">
          ❤️ Favorites ({favoriteCount})
        </Link>

        <button
          className={styles.themeBtn}
          onClick={toggleTheme}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}