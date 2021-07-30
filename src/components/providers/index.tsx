import { useRouter } from "next/dist/client/router";
import { FC, Key } from "react";
import { assign } from "xstate";
import { Context, usePrepare } from "../../lib/context";
import requests from "../../lib/requests";

type Props = { key?: Key | null | undefined };

const ProviderMachine: FC<Props> = ({ key, children }) => {
  const router = useRouter();

  const queryGenre = (
    !router.query.genre ? "fetchTrending" : router.query.genre
  ) as keyof typeof requests;

  const queryLanguage = (
    !router.query.lang ? "fr" : router.query.lang
  ) as string;

  // #region Machine Interpreter

  const value = usePrepare({
    actions: {
      getInitialGenre: assign({ genre: (_) => queryGenre }),
      getInitialLanguage: assign({ language: (_) => queryLanguage }),
    },
    services: {
      changeLanguage: async (ctx, ev) => {
        const genre = ctx.genre;
        if (ev.type === "changeLanguage") {
          const lang = ev.value;
          const query =
            genre === "fetchTrending"
              ? {
                  lang,
                }
              : { genre, lang };
          return await router
            .push({
              pathname: "/",
              query,
            })
            .then(() => lang)
            .catch(() => lang);
        }
      },
      fetch: async (ctx, ev) => {
        const lang = ctx.language;
        if (ev.type === "fetch") {
          const genre = ev.value;

          if (ctx.genre === genre) return;

          if (!ctx.genre && genre === "fetchTrending") {
            return;
          }

          const query =
            genre === "fetchTrending"
              ? {
                  lang,
                }
              : {
                  genre,
                  lang,
                };

          return await router
            .push({
              pathname: "/",
              query,
            })
            .then(() => genre)
            .catch(() => genre);
        }
      },
    },
  });

  // #endregion

  return <Context.Provider {...{ value, key }}>{children}</Context.Provider>;
};

export default ProviderMachine;
