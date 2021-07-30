import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  createRef,
  useState,
} from "react";
import useEventListener from "./useEventListener";
import useMouseMove from "./useMouseMove";
import useResize from "./useResize";

const useIsOverflowed = () => {
  const [disabled, setDisabled] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const out =
      !!ref.current && ref.current.scrollWidth <= ref.current.clientWidth + 2;
    setDisabled(out);
  }, [setDisabled]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    update();
  }, [update, ref]);

  useResize(update, !!ref.current);
  useEventListener("mouseover", update);

  return [ref, disabled, setDisabled] as const;
};

export default useIsOverflowed;
