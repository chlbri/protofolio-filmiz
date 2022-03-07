import { createContext } from 'react';
import type { InterpreterFrom, StateFrom } from 'xstate';
import { machine } from '../abr/machine';
import { TEvent } from '../abr/types';
import { useContextState, useTypedSend } from './hooks';

const MachineContext = createContext(
  {} as InterpreterFrom<typeof machine>,
);

export default MachineContext;

export function useSend(type: TEvent['type']) {
  return useTypedSend(MachineContext, type);
}

export function useState<T>(
  selector: (emitted: StateFrom<typeof machine>) => T,
  compare?: (a: T, b: T) => boolean,
) {
  return useContextState(MachineContext, selector, compare);
}
