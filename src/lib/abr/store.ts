import { machine } from "./machine";
import create, {
  EqualityChecker,
  State,
  StateSelector,
  StoreApi,
} from "zustand";
import zx, { Store } from "@bemedev/middleware-zustand-xstate-fsm";
import { useRouter } from "next/router";
import { TContext, TEvent } from "./types";
import { useEffect } from "react";

const _useAppMachine = create(zx(machine));

type _StateSelector<U = any> = StateSelector<
  Store<
    TContext,
    TEvent,
    {
      value: any;
      context: TContext;
    }
  >,
  U
>;

function useAppMachine<U = any>(
  selector?: _StateSelector<U>,
  equalityFn?: EqualityChecker<U>
) {
  const { push } = useRouter();
  //   const genre = _useAppMachine((store) => store.state.context.genre);
  //   const lang = _useAppMachine((store) => store.state.context.language);
  //   const changed = _useAppMachine((store) => store.state.changed);
  const subscribe = _useAppMachine((store) => store.service.subscribe);
  useEffect(() => {
    subscribe((state) => {
      if (state.changed)
        push({
          pathname: "/",
          query: {
            genre: state.context.genre,
            lang: state.context.language,
          },
        });
      console.log("count");
    });
  }, []);

  const _selector =
    selector ??
    (function (store: any) {
      return store;
    } as unknown as _StateSelector<U>);
  return _useAppMachine(_selector, equalityFn);
}

export default useAppMachine;
