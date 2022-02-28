import type { FC } from 'react';
import FlipMove from 'react-flip-move';
import Movie from '../../lib/ebr/Movie';
import ItemResult from './Item';

type Props = { movies: Movie[] | undefined };
const Movies: FC<Props> = ({ movies }) => {
  return !movies ? null : (
    <FlipMove className="my-10 justify-center px-5 sm:grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6">
      {movies.map(movie => (
        <ItemResult key={movie.id} result={movie} />
      ))}
    </FlipMove>
  );
};

export default Movies;
