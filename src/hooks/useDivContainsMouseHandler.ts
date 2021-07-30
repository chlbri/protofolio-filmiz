import { useCallback, useEffect, useRef } from "react";

const useContainsMouseHandler = (handler: () => void) => {
  const ref = useRef<any>();

  const handleHideDropdown = useCallback(
    (event: KeyboardEvent) => {
      (event.key === "Escape" || event.key === "Esc") && handler();
    },
    [handler]
  );

  const handleClickOutside = useCallback(
    (event: Event) => {
      !ref.current?.contains(event.target as Node) && handler();
    },
    [handler]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, handleHideDropdown]);

  return ref;
};

export default useContainsMouseHandler;
