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
    console.log('Updated');
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

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    function updt() {
      console.log('Hover !!!! and CO&');
      update();
    }
    ref.current!.addEventListener('mouseover', updt);
    return ref.current!.removeEventListener('mouseover', updt);
  }, [update, ref]);

  useResize(update, !!ref.current);
  return [ref, disabled, setDisabled] as const;
};

export default useIsOverflowed;
