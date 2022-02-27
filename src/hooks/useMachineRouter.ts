import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppMachine from '../lib/abr/store';

export default function useMachineRouter() {
  const { push } = useRouter();

  const subscribe = useAppMachine(store => store.service.subscribe);

  return useEffect(() => {
    subscribe(state => {
      if (state.changed) {
        push({
          pathname: '/',
          query: {
            genre: state.context.genre,
            lang: state.context.language,
          },
        });
      }
      console.log('count');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe]);
}
