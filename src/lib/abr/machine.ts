import { assign, createMachine } from 'xstate';
import type { TContext, TEvent } from './types';

export const machine = createMachine<TContext, TEvent>(
  {
    context: {
      iterator: 0,
      genre: 'fetchTrending',
      selected: undefined,
      // movies: [],
      language: 'fr',
    },
    type: 'parallel',

    states: {
      selection: {
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
        states: {
          normal: {
            on: {
              CHANGE_LANGUAGE: {
                actions: 'changeLanguage',
                target: 'changingLanguage',
              },
            },
            exit: 'inc',
          },
          changingLanguage: {
            invoke: {
              src: 'changeLanguage',
              onDone: 'normal',
              onError: 'normal',
            },
            exit: 'inc',
          },
        },
      },
      genre: {
        states: {
          normal: {
            on: {
              CHANGE_GENRE: {
                actions: 'changeGenre',
                target: 'changingGenre',
              },
            },
            exit: 'inc',
          },
          changingGenre: {
            invoke: {
              src: 'changeGenre',
              onDone: 'normal',
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
        language: (ctx, ev) => {
          if (ev.type === 'CHANGE_LANGUAGE') {
            return ev.value ?? 'fr';
          }
          console.log(ctx);

          return ctx.language;
        },
      }),
      changeGenre: assign({
        genre: (ctx, ev) => {
          if (ev.type === 'CHANGE_GENRE') {
            return ev.value ?? 'fetchTrending';
          }
          return ctx.genre;
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
