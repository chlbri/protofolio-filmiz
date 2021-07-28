import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import useResize from './useResize';

const useIsOverflowed = () => {
  const [disabled, setDisabled] = useState(true);
  const ref = useRef<any>();

  const update = useCallback(() => {
    setDisabled(ref.current.scrollWidth <= ref.current.clientWidth);
  }, [setDisabled]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    update();
  }, [update]);

  useResize(update, ref.current);
  return [ref, disabled, setDisabled] as const;
};

export default useIsOverflowed;
