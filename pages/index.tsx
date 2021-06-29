import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { FC } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Results from '../components/Results';
import Movie from '../utils/Movie';
import requests from '../utils/requests';

type Props = { results: any };
const Home: FC<Props> = ({ results }) => {
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
      <Results {...{ results }} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> =
  async (ctx) => {
    const genre = ctx.query?.genre;

    const url = `https://api.themoviedb.org/3/${
      requests[genre as keyof typeof requests]?.url ||
      requests.fetchTrending.url
    }`;

    try {
      const _request = await fetch(url);

      const results = (await _request
        .json()
        .then((data) => data?.results)) as Movie[];

      console.log('Great');
      return {
        props: {
          results,
        },
      };
    } catch (err) {
      console.log('Not Great');

      return {
        props: {
          results: null,
        },
      };
    }
  };

export default Home;
