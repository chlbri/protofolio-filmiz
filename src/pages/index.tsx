import { ServerIcon } from "@heroicons/react/outline";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { StateValueMap } from "xstate";
import Header from "../components/Header";
import Modal from "../components/modal";
import Nav from "../components/Nav";
import Movies from "../components/Results";
import useAppMachine from "../lib/context/store";
import { isRequest } from "../lib/context/types";
import Movie from "../lib/Movie";
import requests from "../lib/requests";

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  movies,
}) => {
  // useEffect(() => {
  //   const lang = router.query.lang;
  //   const genre = router.query.genre;
  //   if (!!lang && typeof lang === "string") {
  //     send({ type: "changeLanguage", value: lang ?? 'fr' });
  //   }
  //   if (isRequest(genre)) {
  //     send({ type: "fetch", value: genre ?? 'fetchTrending' });
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Filmiz 2.0</title>
      </Head>
      <div>
        <Header />

        <Nav />

        <Movies movies={movies} />

        <Nav className="mb-10" />
      </div>
      <Modal />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // ctx.params
  if (!process.env.TMDB_API_URL)
    throw new Error("L'url de l'api doit être défine");

  if (!process.env.TMDB_API_KEY)
    throw new Error("La clé de l'api doit être défine");

  const genre = ctx.query?.genre;
  const lang = ctx.query?.lang;
  const url = `${process.env.TMDB_API_URL}/${
    requests[(genre as keyof typeof requests) ?? "fetchTrending"]!.url
  }&language=${lang ?? "fr"}`;

  const movies = await fetch(url)
    .then((data) => data.json())
    .then<Movie[]>((data) => data.results)
    .catch(() => undefined);

  return {
    props: {
      movies,
    },
  };
};

export default Home;
