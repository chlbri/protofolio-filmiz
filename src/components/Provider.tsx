import { useInterpret } from '@xstate/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { machine } from '../lib/abr/machine';
import MachineContext from '../lib/adapters';
import Movie from '../lib/ebr/Movie';
import requests, { Requests } from '../lib/ebr/Requests';

const Provider: FC = ({ children }) => {
  const router = useRouter();
  const routerPath = router.pathname.replace('/', '');
  const genre = routerPath === '' ? 'Trending' : (routerPath as Requests);

  const language = (
    !router.query.lang ? 'fr' : router.query.lang
  ) as string;

  const value = useInterpret(
    machine
      .withContext({
        ...machine.context,
        genre,
        language,
        // scrollNavbar,
      })
      .withConfig({
        services: {
          changeLanguage: async (ctx, ev) => {
            const genre = ctx.genre;
            if (ev.type === 'CHANGE_LANGUAGE') {
              const lang = ev.value;
              // if (!process.env.TMDB_API_KEY)
              //   throw new Error("La clé de l'api doit être défine");

              // const TMDB_API_URL = process.env.TMDB_API_URL;
              // if (!TMDB_API_URL)
              //   throw new Error("L'url de l'api doit être défine");
              // const url = `${TMDB_API_URL}/${
              //   requests.fetchTopRated.url
              // }&language=${lang ?? 'fr'}`;
              // const movies = await fetch(url)
              //   .then(data => data.json())
              //   .then<Movie[]>(data => data.results)
              //   .catch(() => undefined);

              if (ctx.language === lang) return;

              const query = { lang };
              return await router
                .push({
                  pathname: `/${genre == 'Trending' ? '' : genre}`,
                  query,
                })
                .then(() => lang)
                .catch(() => lang);
            }
          },
          changeGenre: async (ctx, ev) => {
            const lang = ctx.language;
            if (ev.type === 'CHANGE_GENRE') {
              const genre = ev.value;

              if (ctx.genre === genre) return;

              const query = {
                lang,
              };

              return await router
                .push({
                  pathname: `/${genre == 'Trending' ? '' : genre}`,
                  query,
                })
                .then(() => genre)
                .catch(() => genre);
            }
          },
          changeMovies: async ctx => {
            const TMDB_API_URL = process.env.TMDB_API_URL;
            const url = `${TMDB_API_URL}/${
              requests[ctx.genre].url
            }&language=${ctx.language}`;

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
