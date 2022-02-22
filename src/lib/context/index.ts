import { UseMachineOptions } from "@xstate/react/lib/types";
import { InterpreterOptions, MachineOptions } from "xstate";
import { createMachineContext } from "./createContext";
import { useMachineContext, usePrepareMachineContext } from "./hooks";
import { machine } from "./machine";
import { TContext, TEvent } from "./types";

function usePrepare(
  options?: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>>
) {
  return usePrepareMachineContext(machine);
}

const Context = createMachineContext(machine);

function useContext() {
  return useMachineContext(Context);
}

export { Context, usePrepare, useContext };
