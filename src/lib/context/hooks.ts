import { useMachine } from "@xstate/react";
import { MaybeLazy, UseMachineOptions } from "@xstate/react/lib/types";
import omit from "lodash/omit";
import { Context, useContext } from "react";
import {
  EventObject,
  InterpreterOptions,
  MachineOptions,
  StateMachine,
  Typestate,
} from "xstate";
import { ContextType } from "./types";

export function usePrepareMachineContext<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  machine: MaybeLazy<StateMachine<TContext, any, TEvent, TTypestate>>,
  options?: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>>
) {
  const [state, send, serviceMachine] = useMachine(machine, options);
  const service = omit(serviceMachine, "send", "sender", "state");
  return [state, send, service] as ContextType<TContext, TEvent, TTypestate>;
}

export function useMachineContext<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(ctx: Context<ContextType<TContext, TEvent, TTypestate>>) {
  const out = useContext(ctx);
  if (!out) throw new Error("machine cannot be undefined");
  return out;
}
