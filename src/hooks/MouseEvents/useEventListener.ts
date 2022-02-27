import { useLayoutEffect } from "react";

const useEventListener = (
  event: keyof WindowEventMap,
  handler: () => void,
) =>
  useLayoutEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler]);

export default useEventListener;
