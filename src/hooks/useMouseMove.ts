import useEventListener from "./useEventListener";

const useMouseMove = (handler: () => void, state = true) =>
  useEventListener("mousemove", handler, state);

export default useMouseMove;
