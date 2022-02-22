import { useCallback, useEffect, useRef, useState } from "react";

const useContainsMouse = (initialIsVisible = true) => {
  const [isInside, setIsInside] = useState(initialIsVisible);
  const ref = useRef<any>();

  const handleHideDropdown = useCallback(
    (event: KeyboardEvent) => {
      setIsInside(!(event.key === "Escape" || event.key === "Esc"));
    },
    [setIsInside]
  );

  const handleClickOutside = useCallback(
    (event: Event) => {
      setIsInside(
        !(ref.current && !ref.current.contains(event.target as Node))
      );
    },
    [setIsInside]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, handleHideDropdown]);

  return {
    ref,
    isInside,
    setIsInside,
  };
};

export default useContainsMouse;
