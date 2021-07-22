import { nanoid } from 'nanoid';
import { machineAtom } from 'recoil-machine';
import { assign, DoneInvokeEvent, EventObject } from 'xstate';
import requests from '../requests';
import Movie from '../Movie';

const context = {
  genre: 'fetchTrending',
  selected: undefined,
  movies: [],
};

type Context = {
  selected: Movie | undefined;
  genre: string;
  movies: Movie[];
};

type TEvent =
  | {
      type: keyof typeof requests;
    }
  | { type: 'select'; value: Movie | undefined };

const machine = machineAtom<Context, TEvent>({
  key: nanoid(),
  config: {
    context,
    type: 'parallel',
    states: {
      language: {
        initial: 'idle',
        states: {
          idle: {},
        },
      },
      fetch: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              fetchTrending: 'fetching',
              fetchTopRated: 'fetching',
              fetchActionsMovies: 'fetching',
              fetchComedyMovies: 'fetching',
              fetchHorrorMovies: 'fetching',
              fetchRomanceMovies: 'fetching',
              fetchMystery: 'fetching',
              fetchSciFi: 'fetching',
              fetchWestern: 'fetching',
              fetchAnimation: 'fetching',
              fetchTV: 'fetching',
            },
          },
          fetching: {
            entry: () => assign<Context>({ selected: undefined }),
            invoke: {
              src: 'fetch',
              onDone: {
                target: 'success',
                actions: assign({
                  movies: (_, ev: DoneInvokeEvent<Movie[]>) => ev.data,
                }),
              },
              onError: {
                target: 'success',
                actions: assign({ movies: (_) => [] }),
              },
            },
          },
          success: {},
          failure: {},
        },
      },
      select: {
        initial: 'idle',
        states: {
          idle: {},
        },
      },
    },
  },
  options: {
    services: {
      fetch: async (ctx, ev) => {
        if (ev.type !== 'select') {
          const genre = ev.type;
          if (ctx.genre === genre) return;
          const url = `https://api.themoviedb.org/3/${
            requests[genre].url ||
            requests.fetchTrending.url
          }&language=fr`;
          const movies = await fetch(url)
            .then((data) => data.json())
            .then<Movie[]>((data) => data.results)
            .catch(() => undefined);
          return movies;
        }
      },
    },
  },
});
