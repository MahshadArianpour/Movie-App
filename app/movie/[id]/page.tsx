import Link from "next/link";
import styles from "./page.module.css";

interface MovieDetails {
  Title: string;
  Poster: string;
  Plot: string;
  Genre: string;
  Released: string;
  Runtime: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  imdbVotes: string;
  Country: string;
  Language: string;
}

async function getMovie(id: string) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (data.Response === "False") {
    throw new Error("Movie not found");
  }

  return data;
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie: MovieDetails = await getMovie(id);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.back}>
        ← Back
      </Link>

      <div className={styles.card}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/400x600?text=No+Image"
          }
          alt={movie.Title}
          width={350}
          height={500}
          className={styles.poster}
        />

        <div className={styles.info}>
          <h1>{movie.Title}</h1>

          <h2>⭐ {movie.imdbRating}</h2>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>

          <p>
            <strong>Released:</strong> {movie.Released}
          </p>

          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>

          <p>
            <strong>Director:</strong> {movie.Director}
          </p>

          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p>
            <strong>Language:</strong> {movie.Language}
          </p>

          <p>
            <strong>Country:</strong> {movie.Country}
          </p>

          <p>
            <strong>IMDb Votes:</strong> {movie.imdbVotes}
          </p>

          <hr />

          <h3>Story</h3>

          <p>{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}