import { createContext } from "react";
import {
  EventObject,
  Interpreter,
  State,
  StateMachine,
  Typestate,
} from "xstate";

export function createMachineContext<
T extends StateMachine<any, any, any, any, any, any, any>
>(machine?: T) {
  return createContext<
    | [
        State<TContext, TEvent, any, TTypestate>,
        Interpreter<TContext, any, TEvent, TTypestate>["send"],
        Omit<
          Interpreter<TContext, any, TEvent, TTypestate>,
          "send" | "sender" | "state"
        >
      ]
    | undefined
  >(undefined);
}
