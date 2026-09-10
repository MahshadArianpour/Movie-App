"use client";

import { useEffect, useState } from "react";

import styles from "./components/page.module.css";

import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import Loading from "./loading";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleFavorite = (id: string) => {
    let newFavorites: string[];

    if (favorites.includes(id)) {
      newFavorites = favorites.filter(
        (movieId) => movieId !== id
      );
    } else {
      newFavorites = [...favorites, id];
    }

    setFavorites(newFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(newFavorites)
    );
  };

  async function getMovies(movieName: string) {
    if (!movieName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${movieName}`
      );

      const data = await res.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error);
        return;
      }

      setMovies(data.Search);
    } catch (err) {
      console.error(err);
      setMovies([]);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies("Batman");

    const savedFavorites =
      localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar
        favoriteCount={favorites.length}
      />

      <div className={styles.container}>
        <div className={styles.searchBox}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search Movie..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getMovies(search);
              }
            }}
          />

          <button
            className={styles.button}
            onClick={() => getMovies(search)}
          >
            Search
          </button>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <div className={styles.movies}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={favorites.includes(
                movie.imdbID
              )}
              onFavorite={() =>
                toggleFavorite(movie.imdbID)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}