import { useSelector } from '@xstate/react';
import type { Context } from 'react';
import { useContext } from 'react';
import type { InterpreterFrom, StateFrom, StateMachine } from 'xstate';

type EventPropsFromContextInterpreter<
  M,
  T extends string,
> = M extends Context<
  InterpreterFrom<StateMachine<any, any, infer Event, any, any, any, any>>
>
  ? Event extends { type: T } & infer R
    ? Omit<R, 'type'>
    : never
  : never;

type EventTypeFromContextInterpreter<M> = M extends Context<
  InterpreterFrom<StateMachine<any, any, infer Event, any, any, any, any>>
>
  ? Event['type']
  : never;

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type Unionize<T extends Record<string, any>> = {
  [P in keyof T]: { [Q in P]: T[P] };
}[keyof T];

type InferMachineFromContextInterpreter<C> = C extends Context<
  InterpreterFrom<infer M>
>
  ? M extends StateMachine<any, any, any>
    ? M
    : never
  : never;

export function useSend<
  C extends Context<
    InterpreterFrom<StateMachine<any, any, any, any, any, any, any>>
  >,
>(context: C) {
  const service = useContext(context);
  return service.send;
}

export function useTypedSend<
  C extends Context<
    InterpreterFrom<StateMachine<any, any, any, any, any, any, any>>
  >,
  T extends EventTypeFromContextInterpreter<C>,
>(context: C, type: T) {
  const service = useContext(context);
  return (args: EventPropsFromContextInterpreter<C, T>) =>
    service.send({ type, ...args });
}

export function useContextState<
  C extends Context<
    InterpreterFrom<StateMachine<any, any, any, any, any, any, any>>
  >,
  T,
>(
  context: C,
  selector: (
    emitted: StateFrom<InferMachineFromContextInterpreter<C>>,
  ) => T,
  compare?: (a: T, b: T) => boolean,
): T {
  const service = useContext(context);
  return useSelector(service, selector, compare);
}
