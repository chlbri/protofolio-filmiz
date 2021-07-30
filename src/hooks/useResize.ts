import useEventListener from "./useEventListener";

const useResize = (handler: () => void, state = true) =>
  useEventListener("resize", handler, state);
export default useResize;
