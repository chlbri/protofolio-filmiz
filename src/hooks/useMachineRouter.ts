import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppMachine from '../lib/abr/store';

export default function useMachineRouter() {
  const router = useRouter();

  const subscribe = useAppMachine(store => store.service.subscribe);

  return useEffect(() => {
    subscribe(state => {
      // document.body.style.overflow = state.context.selected ? "hidden" : "unset";

      if (state.changed) {
        router.push(
          {
            pathname: '/',
            query: {
              genre: state.context.genre,
              lang: state.context.language,
            },
          },
          undefined,
          { scroll: false },
        );
        console.log('count');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe]);
}
