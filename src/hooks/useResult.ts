import useAppMachine from '../lib/abr/store';
import type Movie from '../lib/ebr/Movie';
import useIsOverflowed from './MouseEvents/useIsOverflowed';

export default function useResult(value: Movie) {
  const send = useAppMachine(store => store.send);
  const {
    backdrop_path,
    poster_path,
    // media_type,
  } = value;

  const src = `${process.env.TMDB_IMAGES_URL}${
    backdrop_path || poster_path
  }`;

  const [yRef, disabled] = useIsOverflowed();

  const onClick = () => {
    send({ type: 'SELECT', value });
  };

  return {
    src,
    yRef,
    disabled,
    onClick,
  } as const;
}
