import { useSend, useState } from '../lib/adapters';
import type { Requests } from '../lib/ebr/Requests';

export default function useGenre(value: Requests) {
  const send = useSend('CHANGE_GENRE');
  const genre = useState(state => state.context.genre);

  const pink = value === genre;

  const className = `${
    pink ? 'text-pink-600' : 'hover:text-white'
  } last:pr-24 cursor-pointer  transition duration-100 transform hover:scale-125 active:text-red-400`;
  return {
    onClick: () => {
      send({ value });
    },
    className,
  };
}
