import { useLayoutEffect, useRef } from 'react';

const useResize = (handler: () => void, state = true) => {
  useLayoutEffect(() => {
    if (!state) {
      return;
    }

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [handler, state]);
};

export default useResize;
