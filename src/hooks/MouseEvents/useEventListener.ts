import { useLayoutEffect } from 'react';

const useEventListener = (
  event: keyof WindowEventMap,
  handler: () => void,
  state = true,
) =>
  useLayoutEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler, state]);

export default useEventListener;
