import { useCallback, useLayoutEffect, useRef } from 'react';
import useResize from './useResize';

const useIsOverflowedHandler = (handler: () => void) => {
  const ref = useRef<any>();

  const update = useCallback(() => {
    const out = ref.current.scrollWidth <= ref.current.clientWidth;
    out && handler();
  }, [handler]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    update();
  }, [update]);

  useResize(update, !!ref.current);

  return ref;
};

export default useIsOverflowedHandler;
