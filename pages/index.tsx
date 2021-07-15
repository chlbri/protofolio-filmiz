/** @format */

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import useFetch from 'use-http';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Movies from '../components/Results';
import Movie from '../utils/Movie';
import requests, { api_key } from '../utils/requests';

const useMovies = () => {
  const genre = useRouter().query?.genre;

  const url = `https://api.themoviedb.org/3/${
    requests[genre as keyof typeof requests]?.url ||
    requests.fetchTrending.url
  }`.replace(api_key, () => process.env.API_KEY!);
  const { loading, error, data = [] } = useFetch(url, {}, []);
  return { loading, error, data };
};

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  movies,
}) => {
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <meta
          name='description'
          content='A copy of Hulu for my porotofolio (@chlbri)'
        />
      </Head>

      {/* Header */}
      <Header />

      {/* Nav */}
      <Nav />

      {/* Results */}

      {movies && <Movies movies={movies} />}

      {/* Nav */}
      <Nav className='mb-10' />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const genre = ctx.query?.genre;
  const url = `https://api.themoviedb.org/3/${
    requests[genre as keyof typeof requests]?.url ||
    requests.fetchTrending.url
  }`.replace(api_key, () => process.env.API_KEY!);

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
