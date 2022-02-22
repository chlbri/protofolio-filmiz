import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { FC } from "react";
import Header from "../components/Header";
import Modal from "../components/modal";
import Nav from "../components/Nav";
import Movies from "../components/Results";
import Movie from "../lib/ebr/Movie";
import requests from "../lib/ebr/Requests";

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  movies,
}) => {
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
  if (!process.env.TMDB_API_KEY)
    throw new Error("La clé de l'api doit être défine");

  const TMDB_API_URL = process.env.TMDB_API_URL;
  if (!TMDB_API_URL) throw new Error("L'url de l'api doit être défine");

  const genre = ctx.query?.genre;
  const lang = ctx.query?.lang;
  const url = `${TMDB_API_URL}/${
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
