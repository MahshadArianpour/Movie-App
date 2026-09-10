"use client";

import Link from "next/link";
import styles from "./MovieCard.module.css";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface Props {
  movie: Movie;
  isFavorite: boolean;
  onFavorite: () => void;
}

export default function MovieCard({ movie,isFavorite,onFavorite }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/300x450?text=No+Image"
          }
          alt={movie.Title}
          className={styles.image}
        />

        <button
          className={styles.favorite}
          onClick={onFavorite}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className={styles.content}>
        <h2>{movie.Title}</h2>

        <p>{movie.Year}</p>

        <Link
          href={`/movie/${movie.imdbID}`} 
          className={styles.detailsBtn}
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}