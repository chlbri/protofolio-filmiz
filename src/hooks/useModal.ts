import { useCallback } from "react";
import useAppMachine from "../lib/abr/store";
import useDivContainsMouseHandler from "./MouseEvents/useDivContainsMouseHandler";

export default function useModal() {
  const send = useAppMachine((store) => store.send);
  const movie = useAppMachine((store) => store.state.context.selected);

  const onClick = useCallback(() => {
    return send({ type: "resetSelection" });
  }, [send]);

  const refC = useDivContainsMouseHandler(onClick);
  return { movie, refC, onClick } as const;
}
