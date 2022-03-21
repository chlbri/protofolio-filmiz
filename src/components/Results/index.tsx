import { FC } from 'react';
import FlipMove from 'react-flip-move';
import { useState } from '../../lib/adapters';
import ItemResult from './Item';

const Movies: FC = () => {
  const movies = useState(state => state.context.movies);

  return !movies ? null : (
    <FlipMove className="my-10 justify-center px-5 sm:grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6">
      {movies.map(movie => (
        <ItemResult key={movie.id} result={movie} />
      ))}
    </FlipMove>
  );
};

export default Movies;
