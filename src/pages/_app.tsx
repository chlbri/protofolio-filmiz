/** @format */

import { useMachine } from "@xstate/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import { assign } from "xstate";
import Provider from "../components/providers";
import { machine } from "../lib/context";
import requests from "../lib/requests";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // #region Machine Config
  const router = useRouter();
  const queryGenre = (
    !router.query.genre ? "fetchTrending" : router.query.genre
  ) as keyof typeof requests;

  const queryLanguage = (
    !router.query.lang ? "fr" : router.query.lang
  ) as string;

  const [state, send] = useMachine(
    machine.withConfig({
      actions: {
        getInitialGenre: assign({ genre: (_) => queryGenre }),
        getInitialLanguage: assign({ language: (_) => queryLanguage }),
      },
      services: {
        changeLanguage: async (ctx, ev) => {
          const genre = ctx.genre;
          if (ev.type === 'changeLanguage') {
            const lang = ev.value;
            const query = !genre
              ? {
                  lang,
                }
              : { genre, lang };
            await router
              .push({
                pathname: '/',
                query,
              })
              .then(() => {
                console.log(genre);
              });
          }
        },
        fetch: async (ctx, ev) => {
          const lang = ctx.language;
          if (ev.type === 'fetch') {
            const genre = ev.value;

            if (ctx.genre === genre) return;

            if (!ctx.genre && genre === 'fetchTrending') {
              return;
            }

            const query =
              genre === 'fetchTrending'
                ? {
                    lang,
                  }
                : {
                    genre,
                    lang,
                  };

            return await router
              .push({
                pathname: '/',
                query,
              })
              .then(() => genre);
          }
        },
      },
    }),
  );
  // #endregion

  const value = [state, send] as const;
  return (
    <Provider value={value}>
      <>
        <Head>
          <title>Filmiz 2.0</title>
        </Head>
        <Component {...pageProps} />
      </>
    </Provider>
  );
}
export default MyApp;
