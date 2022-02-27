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
import { useEffect, useMemo } from "react";
import { StateMachine } from "@xstate/fsm";

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

function getSub(
  store: Store<
    TContext,
    TEvent,
    {
      value: any;
      context: TContext;
    }
  >
) {
  return store.service.subscribe;
}

function useAppMachine<U = any>(
  selector?: _StateSelector<U>,
  equalityFn?: EqualityChecker<U>
) {
  const { push } = useRouter();
  //   const genre = _useAppMachine((store) => store.state.context.genre);
  //   const lang = _useAppMachine((store) => store.state.context.language);
  //   const changed = _useAppMachine((store) => store.state.changed);
  const subscribe = _useAppMachine(getSub);

  const _sub = useMemo(
    () =>
      (
        state: StateMachine.State<
          TContext,
          TEvent,
          {
            value: any;
            context: TContext;
          }
        >
      ) => {
        if (state.changed)
          //   push({
          //     pathname: "/",
          //     query: {
          //       genre: state.context.genre,
          //       lang: state.context.language,
          //     },
          //   });
          console.log("count");
      },
    []
  );
  useEffect(() => {
    subscribe(_sub);
  }, []);

  const _selector =
    selector ??
    (function (store: any) {
      return store;
    } as unknown as _StateSelector<U>);
  return _useAppMachine(_selector, equalityFn);
}

export default useAppMachine;
