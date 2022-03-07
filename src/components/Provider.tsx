import { useInterpret } from '@xstate/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { machine } from '../lib/abr/machine';
import MachineContext from '../lib/adapters';
import { Requests } from '../lib/ebr/Requests';

const Provider: FC = ({ children }) => {
  const router = useRouter();

  const genre = (
    !router.query.genre ? 'fetchTrending' : router.query.genre
  ) as Requests;

  const language = (
    !router.query.lang ? 'fr' : router.query.lang
  ) as string;

  const value = useInterpret(
    machine
      .withContext({
        ...machine.context,
        genre,
        language,
      })
      .withConfig({
        services: {
          changeLanguage: async (ctx, ev) => {
            const genre = ctx.genre;
            if (ev.type === 'CHANGE_LANGUAGE') {
              const lang = ev.value;

              if (ctx.language === lang) return;

              const query = { genre, lang };
              return await router
                .push({
                  pathname: '/',
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
                genre,
                lang,
              };

              return await router
                .push({
                  pathname: '/',
                  query,
                })
                .then(() => genre)
                .catch(() => genre);
            }
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
