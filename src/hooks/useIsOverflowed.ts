import { useEffect, useRef, useState } from 'react';

const useIsOverflowed = () => {
  const [disabled, setDisabled] = useState(true);

  const ref = useRef<any>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const out = ref.current.scrollWidth <= ref.current.clientWidth;

    setDisabled(out);
  }, [ref, setDisabled]);
  return [ref, disabled, setDisabled] as const;
};

export default useIsOverflowed;
