import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, name }) => {
        const displayTitle =
          typeof title === 'string'
            ? title
            : typeof name === 'string'
            ? name
            : 'No title';

        return (
          <li key={id}>
            <Link
              to={`/movies/${id}`}
              state={{ from: location }}
              className={css.link}
            >
              {displayTitle}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
