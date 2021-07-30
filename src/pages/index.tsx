import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import Header from "../components/Header";
import Modal from "../components/modal";
import Nav from "../components/Nav";
import Movies from "../components/Results";
import Movie from "../lib/Movie";
import requests from "../lib/requests";

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  movies,
}) => {
  const router = useRouter();

  const queryGenre = (
    !router.query.genre ? "fetchTrending" : router.query.genre
  ) as keyof typeof requests;

  const queryLanguage = (
    !router.query.lang ? "fr" : router.query.lang
  ) as string;

  return (
    <>
      <div>
        {/* Header */}
        <Header />

        {/* Nav */}
        <Nav />

        {/* Results */}

        {movies && <Movies movies={movies} />}

        {/* Nav */}
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
  }&language=${
    lang ?? "fr"
  }`; /* .replace(api_key, () => process.env.TMDB_API_KEY!) */

  const movies = await fetch(url)
    .then((data) => data.json())
    .then<Movie[]>((data) => data.results)
    .catch(() => null);

  return {
    props: {
      movies,
    },
  };
};

export default Home;
