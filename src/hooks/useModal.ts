import { useCallback } from 'react';
import { useSend, useState } from '../lib/adapters';
import useDivContainsMouseHandler from './MouseEvents/useDivContainsMouseHandler';

export default function useModal() {
  const send = useSend('SELECT');
  const movie = useState(state => state.context.selected);

  const onClick = useCallback(() => {
    send({});
  }, [send]);

  const refC = useDivContainsMouseHandler(onClick);
  return { movie, refC, onClick } as const;
}
