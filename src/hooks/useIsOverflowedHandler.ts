import { useEffect, useRef } from 'react';

const useIsOverflowedHandler = (handler: () => void) => {
  const ref = useRef<any>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const out = ref.current.scrollWidth <= ref.current.clientWidth;
    out && handler();
  }, [handler]);

  return ref;
};

export default useIsOverflowedHandler;
