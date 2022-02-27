import { assign, createMachine } from '@xstate/fsm';
import type { TContext, TEvent } from './types';

export const machine = createMachine<TContext, TEvent>(
  {
    context: {
      genre: 'fetchTrending',
      selected: undefined,
      // movies: [],
      language: 'fr',
    },
    initial: 'notselected',
    states: {
      notselected: {
        on: {
          SELECT: { target: 'selected', actions: 'select' },
          CHANGE_LANGUAGE: {
            actions: 'changeLanguage',
          },
          CHANGE_GENRE: {
            actions: 'changeGenre',
          },
        },
      },
      selected: {
        on: {
          SELECT: { target: 'notselected', actions: 'select' },

          CHANGE_LANGUAGE: {
            actions: 'changeLanguage',
          },
          CHANGE_GENRE: {
            actions: 'changeGenre',
          },
        },
      },
    },
  },
  {
    actions: {
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
