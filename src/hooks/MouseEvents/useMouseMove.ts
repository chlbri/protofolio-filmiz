import useEventListener from './useEventListener';

const useMouseMove = (handler: () => void) =>
  useEventListener('mousemove', handler);

export default useMouseMove;
