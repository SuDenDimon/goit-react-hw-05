import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTrendingMovies } from '../../services/tmdbAPI';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <div className={css.page}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}