import { Temporal } from '@js-temporal/polyfill';
import { useInterpret } from '@xstate/react';
import { FC } from 'react';
import { machine } from '../lib/abr/machine';
import MachineContext from '../lib/adapters';
import Movie from '../lib/ebr/Movie';
import { MOVIES_KEY } from '../lib/ebr/others';
import requests from '../lib/ebr/Requests';

const Provider: FC = ({ children }) => {
  const value = useInterpret(
    machine.withConfig({
      services: {
        changeLanguage: async (ctx, ev) => {
          if (ev.type === 'CHANGE_LANGUAGE') {
            const lang = ev.value;

            return lang;
          }
        },
        changeGenre: async (ctx, ev) => {
          if (ev.type === 'CHANGE_GENRE') {
            const genre = ev.value;

            return genre;
          }
        },
        changeMovies: async ctx => {
          const TMDB_API_URL = process.env.TMDB_API_URL;
          const url = `${TMDB_API_URL}/${
            requests[ctx.genre].url
          }&language=${ctx.language}`;
          const data = localStorage.getItem(MOVIES_KEY);

          if (data) {
            const _lastFetchDate =
              JSON.parse(data)?.[ctx.genre]?.[ctx.language]?.lastDate;

            if (_lastFetchDate) {
              const today = Temporal.Now.plainDateTimeISO().with({
                hour: 0,
                minute: 0,
                millisecond: 0,
                microsecond: 0,
                nanosecond: 0,
              });

              const lastFetchDate =
                Temporal.PlainDateTime.from(_lastFetchDate);
              const duration = today.since(lastFetchDate).nanoseconds;
              if (duration > 0) {
                return fetch(url)
                  .then(data => data.json())
                  .then<Movie[]>(data => data.results);
              }
            }
            const movies =
              JSON.parse(data)?.[ctx.genre]?.[ctx.language]?.results;

            if (movies) {
              return movies as Movie[];
            }
          }

          return fetch(url)
            .then(data => data.json())
            .then<Movie[]>(data => data.results);
        },
      },
    }),
  );

  return (
    <MachineContext.Provider {...{ value }}>
      {children}
    </MachineContext.Provider>
  );
};

export default Provider;
