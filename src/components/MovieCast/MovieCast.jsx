import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from '../../services/tmdbAPI';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map(({ cast_id, name, profile_path, character }) => (
        <li key={cast_id} className={css.item}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://via.placeholder.com/200x300?text=No+Photo'
            }
            alt={name}
            className={css.photo}
          />
          <p><strong>{name}</strong></p>
          <p>as {character}</p>
        </li>
      ))}
    </ul>
  );
}