import { useState, createRef, useEffect } from 'react';

export default function useIsOverflowed() {
  const [disabled, setDisabled] = useState(true);

  const ref = createRef<
    HTMLDivElement &
      HTMLInputElement &
      HTMLSpanElement &
      HTMLParagraphElement &
      HTMLAllCollection
  >();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setDisabled(
      ref.current.scrollWidth <= ref.current.clientWidth,
    );
  }, [ref, setDisabled]);
  return [disabled, ref] as const;
}
