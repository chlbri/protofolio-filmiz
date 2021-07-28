import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  createRef,
  useState,
} from 'react';
import useResize from './useResize';

const useIsOverflowed = () => {
  const [disabled, setDisabled] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const out =
      !!ref.current && ref.current.scrollWidth <= ref.current.clientWidth;
    setDisabled(out);
  }, [setDisabled]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    update();
  }, [update]);

  useResize(update, !!ref.current);
  return [ref, disabled, setDisabled] as const;
};

export default useIsOverflowed;
