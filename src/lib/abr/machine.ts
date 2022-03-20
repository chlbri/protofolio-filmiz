import { assign, createMachine } from 'xstate';
import type { TContext, TEvent } from './types';

export const machine = createMachine(
  {
    context: {
      iterator: 0,
      genre: 'Trending',
      selected: undefined,
      movies: [],
      language: 'fr',
    },
    type: 'parallel',
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      context: {} as TContext,
      events: {} as TEvent,
    },

    states: {
      selection: {
        initial: 'notselected',
        states: {
          notselected: {
            on: {
              SELECT: { target: 'selected', actions: 'select' },
            },
            exit: 'inc',
          },
          selected: {
            on: {
              SELECT: { target: 'notselected', actions: 'select' },
            },
            exit: 'inc',
          },
        },
      },
      language: {
        initial: 'normal',
        states: {
          normal: {
            on: {
              CHANGE_LANGUAGE: {
                target: 'changingLanguage',
              },
            },
            exit: 'inc',
          },
          changingLanguage: {
            invoke: {
              src: 'changeLanguage',
              onDone: {
                actions: 'changeLanguage',
                target: 'normal',
              },
              onError: 'normal',
            },
            exit: 'inc',
          },
        },
      },
      genre: {
        initial: 'normal',
        states: {
          normal: {
            on: {
              CHANGE_GENRE: {
                target: 'changingGenre',
              },
            },
            exit: 'inc',
          },
          changingGenre: {
            invoke: {
              src: 'changeGenre',
              onDone: {
                actions: 'changeGenre',
                target: 'normal',
              },
              onError: 'normal',
            },
            exit: 'inc',
          },
        },
      },
    },
  },
  {
    actions: {
      inc: assign({ iterator: ctx => ctx.iterator + 1 }),
      changeLanguage: assign({
        language: (ctx, ev: any) => {
          return ev.data ?? ctx.language;
        },
      }),
      changeGenre: assign({
        genre: (ctx, ev: any) => {
          return ev.data ?? ctx.genre;
        },
      }),
      select: assign({
        selected: (_, ev) => {
          if (ev.type === 'SELECT') {
            return ev.value;
          }
          console.log(_);

          return undefined;
        },
      }),
    },
  },
);
