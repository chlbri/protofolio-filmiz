/* eslint-disable @typescript-eslint/no-unused-vars */
import { Temporal } from '@js-temporal/polyfill';
import merge from 'lodash.merge';
import { assign, createMachine } from 'xstate';
import Movie from '../ebr/Movie';
import {
  GENRE_KEY,
  LANGUAGE_KEY,
  MOVIES_KEY,
  SCROLL_KEY,
} from '../ebr/others';
import { Requests } from '../ebr/Requests';
import {
  getLocalGenre,
  getLocalLanguage,
  getLocalMovies,
  getLocalScroll,
} from './helpers';
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
    initial: 'idle',
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
      idle: {
        on: {
          LOAD: {
            actions: ['loadScroll', 'loadGenre', 'loadLanguage'],
            target: 'preparing',
          },
        },
      },
      preparing: {
        entry: 'loadMovies',
        always: [
          {
            cond: 'moviesArrayIsEmpty',
            target: 'starting',
          },
          'started',
        ],
      },
      starting: {
        invoke: {
          src: 'changeMovies',
          onDone: {
            actions: ['changeMovies', 'changeLocalMovies'],
            target: 'started',
          },
          onError: 'error',
        },
        exit: 'inc',
      },
      error: {},
      started: {
        type: 'parallel',
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
                    actions: ['changeMovies', 'changeLocalMovies'],
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
                exit: 'inc',
              },
              fetching: {
                invoke: {
                  src: 'changeMovies',
                  onDone: {
                    actions: ['changeMovies', 'changeLocalMovies'],
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
      fetch: {},
    },
  },
  {
    guards: {
      checkEnvironmentsVariables: () => {
        return !!process.env.TMDB_API_KEY && !!process.env.TMDB_API_URL;
      },
      moviesArrayIsEmpty: ctx => ctx.movies.length < 1,
    },
    actions: {
      inc: assign({ iterator: ctx => ctx.iterator + 1 }),
      loadScroll: assign({
        scrollNavbar: _ => getLocalScroll(),
      }),
      loadGenre: assign({
        genre: _ => getLocalGenre(),
      }),
      loadLanguage: assign({
        language: _ => getLocalLanguage(),
      }),
      loadMovies: assign({
        movies: ctx => getLocalMovies(ctx.genre, ctx.language),
      }),
      changeLanguage: assign({
        language: (ctx, ev) => {
          const data = ev.data ?? ctx.language;
          localStorage.setItem(LANGUAGE_KEY, data);

          return data;
        },
      }),
      changeGenre: assign({
        genre: (ctx, ev) => {
          const data = ev.data ?? ctx.genre;
          localStorage.setItem(GENRE_KEY, data);

          return data;
        },
      }),
      select: assign({
        selected: (_, ev) => {
          if (ev.type === 'SELECT') {
            return ev.value;
          }
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
        movies: (ctx, ev) => ev.data ?? ctx.movies,
      }),
      changeLocalMovies: (ctx, ev) => {
        const results = ev.data ?? ctx.movies;
        const previousData = localStorage.getItem(MOVIES_KEY);
        if (!previousData) {
          localStorage.setItem(
            MOVIES_KEY,
            JSON.stringify({
              [ctx.genre]: {
                [ctx.language]: {
                  results,
                  lastDate: Temporal.Now.plainDateTimeISO().toString(),
                },
              },
            }),
          );
        } else {
          const _data = merge(JSON.parse(previousData), {
            [ctx.genre]: {
              [ctx.language]: {
                results,
                lastDate: Temporal.Now.plainDateTimeISO().toString(),
              },
            },
          });
          localStorage.setItem(MOVIES_KEY, JSON.stringify(_data));
        }
      },
    },
  },
);
