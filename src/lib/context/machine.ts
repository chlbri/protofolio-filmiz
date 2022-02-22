import { assign, createMachine } from "xstate";
import { TContext, TEvent } from "./types";

export const machine = createMachine<TContext, TEvent>(
  {
    context: {
      selected: undefined,
    },
    states: {
      select: {
        initial: "idle",
        states: {
          idle: {
            on: {
              select: "selecting",
            },
          },
          selecting: {
            entry: "select",
            always: "selected",
          },
          selected: {
            on: {
              resetSelection: {
                target: "idle",
                actions: "resetSelection",
              },
              hardReset: {
                target: "idle",
                actions: "resetSelection",
              },
              select: "selecting",
            },
          },
        },
      },
    },
  },
  {
    actions: {
      select: assign({
        selected: (_, ev) => {
          if (ev.type === "select") {
            return ev.value;
          }
          return undefined;
        },
      }),
      resetSelection: assign({ selected: (_) => undefined }),
    },
  }
);
