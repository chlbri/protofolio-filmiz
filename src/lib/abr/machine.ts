import { assign, createMachine } from "xstate";
import type { TContext, TEvent } from "./types";

export const machine = createMachine<TContext, TEvent>(
  {
    context: {
      selected: undefined,
    },
    initial: "notselected",
    states: {
      notselected: {
        on: {
          select: { target: "selected", actions: "select" },
        },
      },
      selected: {
        on: {
          resetSelection: {
            target: "notselected",
            actions: "resetSelection",
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
