import { createContext } from "react";
import {
  EventObject,
  Interpreter,
  State,
  StateMachine,
  Typestate,
} from "xstate";

export function createMachineContext<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(machine?: StateMachine<TContext, any, TEvent, TTypestate>) {
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
