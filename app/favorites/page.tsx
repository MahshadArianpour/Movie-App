"use client";

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import styles from "../components/page.module.css";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function FavoritesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavorites(savedFavorites);

    async function loadFavorites() {
      const requests = savedFavorites.map((id: string) =>
        fetch(
          `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${id}`
        ).then((res) => res.json())
      );

      const data = await Promise.all(requests);

      setMovies(data);
    }

    if (savedFavorites.length > 0) {
      loadFavorites();
    }
  }, []);

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter(
      (movieId) => movieId !== id
    );

    setFavorites(newFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(newFavorites)
    );

    setMovies((prev) =>
      prev.filter((movie) => movie.imdbID !== id)
    );
  };

  return (
    <>
      <Navbar favoriteCount={favorites.length} />

      <div className={styles.container}>
        <h1
          style={{
            color: "white",
            marginBottom: "30px",
          }}
        >
          ❤️ My Favorite Movies
        </h1>

        {movies.length === 0 ? (
          <h2 style={{ color: "white" }}>
            No favorite movies yet.
          </h2>
        ) : (
          <div className={styles.movies}>
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={true}
                onFavorite={() =>
                  removeFavorite(movie.imdbID)
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}