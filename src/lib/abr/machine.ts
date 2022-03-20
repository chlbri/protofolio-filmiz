import { assign, createMachine } from 'xstate';
import Movie from '../ebr/Movie';
import { SCROLL_KEY } from '../ebr/others';
import { Requests } from '../ebr/Requests';
import type { TContext, TEvent } from './types';

export const machine = createMachine(
  {
    context: {
      iterator: 0,
      genre: 'Trending',
      selected: undefined,
      movies: [],
      language: 'fr',
      scrollNavbar: 0,
    },
    type: 'parallel',
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      context: {} as TContext,
      events: {} as TEvent,
      services: {
        changeGenre: {} as { data: Requests | undefined },
        changeLanguage: {} as { data: string | undefined },
        changeMovies: {} as { data: Movie[] },
      },
    },
    on: {
      SCROLL_NAVBAR: {
        actions: ['scroll', 'assignScrollNavbar'],
      },
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
                target: 'nextFetch',
              },
              onError: 'normal',
            },
            exit: 'inc',
          },
          nextFetch: {
            always: [
              {
                cond: 'checkEnvironmentsVariables',
                target: 'fetching',
              },
              'normal',
            ],
          },
          fetching: {
            invoke: {
              src: 'changeMovies',
              onDone: {
                actions: 'changeMovies',
                target: 'caching',
              },
              onError: 'normal',
            },
            exit: 'inc',
          },
          caching: {
            after: {
              70: 'normal',
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
                target: 'nextFetch',
              },
              onError: 'normal',
            },
            exit: 'inc',
          },
          nextFetch: {
            always: [
              {
                cond: 'checkEnvironmentsVariables',
                target: 'fetching',
              },
              'normal',
            ],
          },
          fetching: {
            invoke: {
              src: 'changeMovies',
              onDone: {
                actions: 'changeMovies',
                target: 'caching',
              },
              onError: 'normal',
            },
            exit: 'inc',
          },
          caching: {
            after: {
              70: 'normal',
            },
            exit: 'inc',
          },
        },
      },
    },
  },
  {
    guards: {
      checkEnvironmentsVariables: () =>
        !!process.env.TMDB_API_KEY && !!process.env.TMDB_API_URL,
    },
    actions: {
      inc: assign({ iterator: ctx => ctx.iterator + 1 }),
      changeLanguage: assign({
        language: (ctx, ev) => {
          return ev.data ?? ctx.language;
        },
      }),
      changeGenre: assign({
        genre: (ctx, ev) => {
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
      scroll: (_, ev) => {
        localStorage.setItem(SCROLL_KEY, ev.value.toString());
      },

      assignScrollNavbar: assign({
        scrollNavbar: (_, ev) => {
          return ev.value;
        },
      }),

      changeMovies: assign({
        movies: (ctx, ev) => {
          return ev.data ?? ctx.movies;
        },
      }),
    },
  },
);
