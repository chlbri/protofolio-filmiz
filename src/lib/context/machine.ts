import { assign, createMachine } from "xstate";
import { TContext, TEvent } from "./types";

export const machine = createMachine<TContext, TEvent>(
  {
    context: {
      genre: "fetchTrending",
      selected: undefined,
      movies: [],
      language: "fr",
    },
    type: "parallel",
    states: {
      language: {
        initial: "idle",
        states: {
          idle: {
            on: {
              changeLanguage: "changing",
            },
          },
          changing: {
            invoke: {
              src: "changeLanguage",
              onDone: {
                target: "success",
                actions: assign({ language: (_, event) => event.data }),
              },
              onError: "failure",
            },
          },

          success: {
            on: {
              resetLanguage: {
                target: "idle",
                actions: "resetLanguage",
              },
              hardReset: {
                target: "idle",
                actions: "resetLanguage",
              },
              changeLanguage: "changing",
            },
          },
          failure: {
            on: {
              resetLanguage: {
                target: "idle",
                actions: "resetLanguage",
              },
              hardReset: {
                target: "idle",
                actions: "resetLanguage",
              },
              changeLanguage: "changing",
            },
          },
        },
      },
      fetch: {
        initial: "idle",
        states: {
          idle: {
            entry: "getInitialGenre",
            on: {
              fetch: "fetching",
            },
          },
          fetching: {
            invoke: {
              src: "fetch",
              onDone: {
                target: "success",
                actions: assign({ genre: (_, event) => event.data }),
              },
              onError: {
                target: "failure",
              },
            },
          },
          success: {
            on: {
              fetch: "fetching",
              hardReset: { target: "idle", actions: "resetFetch" },
            },
          },
          failure: {
            on: {
              fetch: "fetching",
              hardReset: { target: "idle", actions: "resetFetch" },
            },
          },
        },
      },
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
      changeLanguage: assign({
        language: (_, ev) => {
          if (ev.type === "changeLanguage") {
            return ev.value;
          }
          return "fr-shanged";
        },
      }),
      select: assign({
        selected: (_, ev) => {
          if (ev.type === "select") {
            return ev.value;
          }
          return undefined;
        },
      }),
      resetSelection: assign({ selected: (_) => undefined }),
      resetLanguage: assign({ language: (_) => "fr" }),
      resetFetch: assign({
        genre: (_) => "fetchTrending",
      }),
      assignFetch: assign({
        genre: (ctx, ev) => {
          return ev.type === "fetch" ? ev.value : ctx.genre;
        },
      }),
    },
  }
);
