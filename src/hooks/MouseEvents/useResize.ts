import useEventListener from './useEventListener';

const useResize = (handler: () => void) =>
  useEventListener('resize', handler);
export default useResize;
