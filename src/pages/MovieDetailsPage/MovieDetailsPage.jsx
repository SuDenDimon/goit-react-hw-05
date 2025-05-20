import { useParams, useLocation, Link, Routes, Route, Outlet } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { getMovieDetails } from '../../services/tmdbAPI';

import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from || '/movies';

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const { title, overview, poster_path, vote_average, genres } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className={css.page}>
      <Link to={backLink} className={css.back}>← Go back</Link>

      <div className={css.details}>
        <img src={posterUrl} alt={title} className={css.poster} />
        <div>
          <h1>{title}</h1>
          <p>User score: {Math.round(vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <hr />
      <div className={css.links}>
        <Link to="cast" className={css.link}>Cast</Link>
        <Link to="reviews" className={css.link}>Reviews</Link>
      </div>
      <hr />

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet/>
      </Suspense>
    </div>
  );
}
        