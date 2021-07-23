import { createContext } from "react";
import {
  assign,
  createMachine,
  DoneInvokeEvent,
  EventData,
  interpret,
  SCXML,
  SingleOrArray,
  State,
  Event,
} from "xstate";
import { raise } from "xstate/lib/actions";
import { Interpreter } from "xstate/lib/interpreter";
import Movie from "./Movie";
import requests from "./requests";

type TContext = {
  selected: Movie | undefined;
  genre: keyof typeof requests;
  movies: Movie[];
  language: string;
};

type TEvent =
  | {
      type: "fetch";
      value: keyof typeof requests;
    }
  | { type: "select"; value: Movie | undefined }
  | { type: "changeLanguage"; value: string }
  | { type: "reset" | "hardReset" | "resetSelection" };

export const machine = createMachine<TContext, TEvent>(
  {
    context: {
      genre: 'fetchTrending',
      selected: undefined,
      movies: [],
      language: 'fr',
    },
    type: 'parallel',
    states: {
      language: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              changeLanguage: 'changing',
            },
          },

          changing: {
            entry: 'changeLanguage',
            invoke: {
              src: 'changeLanguage',
              onDone: 'success',
            },
          },

          success: {
            on: {
              reset: {
                target: 'idle',
                actions: 'resetLanguage',
              },
              hardReset: {
                target: 'idle',
                actions: 'resetSelection',
              },
              changeLanguage: 'changing',
            },
          },
        },
      },
      fetch: {
        initial: 'idle',
        states: {
          idle: {
            entry: 'getInitialGenre',
            on: {
              fetch: 'fetching',
            },
          },
          fetching: {
            invoke: {
              src: 'fetch',
              onDone: {
                target: 'success',
                actions: assign({ genre: (_, event) => event.data }),
              },
              onError: {
                target: 'failure',
              },
            },
          },
          success: {
            on: {
              fetch: 'fetching',
              hardReset: { target: 'idle', actions: 'resetFetch' },
            },
          },
          failure: {
            on: {
              fetch: 'fetching',
              hardReset: { target: 'idle', actions: 'resetFetch' },
            },
          },
        },
      },
      select: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              select: 'selecting',
            },
          },
          selecting: {
            entry: 'select',
            always: 'selected',
          },
          selected: {
            on: {
              reset: {
                target: 'idle',
                actions: 'resetSelection',
              },
              resetSelection: {
                target: 'idle',
                actions: 'resetSelection',
              },
              hardReset: {
                target: 'idle',
                actions: 'resetSelection',
              },
              select: 'selecting',
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
          if (ev.type === 'changeLanguage') {
            return ev.value;
          }
          return 'fr-shanged';
        },
      }),
      select: assign({
        selected: (_, ev) => {
          if (ev.type === 'select') {
            return ev.value;
          }
          return undefined;
        },
      }),
      resetSelection: assign({ selected: (_) => undefined }),
      resetLanguage: assign({ language: (_) => 'fr' }),
      resetFetch: assign({
        genre: (_) => 'fetchTrending',
      }),
      assignFetch: assign({
        genre: (ctx, ev) => {
          return ev.type === 'fetch' ? ev.value : ctx.genre;
        },
      }),
    },
  },
);

const inter = interpret(machine).start();

const Context = createContext<ContextInterpreter>([
  inter.initialState,
  inter.send,
]);

export type ContextInterpreter = readonly [
  State<
    TContext,
    TEvent,
    any,
    {
      value: any;
      context: TContext;
    }
  >,
  (
    event: SingleOrArray<Event<TEvent>> | SCXML.Event<TEvent>,
    payload?: EventData | undefined
  ) => State<
    TContext,
    TEvent,
    any,
    {
      value: any;
      context: TContext;
    }
  >
];

export default Context;
