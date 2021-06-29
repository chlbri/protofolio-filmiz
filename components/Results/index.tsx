import { FC } from 'react';
import FlipMove from 'react-flip-move';
import Movie from '../../utils/Movie';
import ItemResult from './Item';

type Props = { results: Movie[] };
const Results: FC<Props> = ({ results }) => {
  return (
    <FlipMove className='px-5 my-10 sm:grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 justify-center'>
      {results.map((result) => (
        // eslint-disable-next-line react/jsx-key
        <ItemResult key={result.id} result={result} />
      ))}
    </FlipMove>
  );
};

export default Results;
