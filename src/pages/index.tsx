/** @format */

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { FC, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Header from '../components/Header';
import Modal from '../components/modal';
import Nav from '../components/Nav';
import Movies from '../components/Results';
import selectedMovie from '../utils/atoms/selectedMovie';
import show from '../utils/atoms/showModal';
import Movie from '../utils/Movie';
import requests, { api_key } from '../utils/requests';

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  movies,
}) => {
  const [showModal, setShowModal] = useRecoilState(show);
  const movie = useRecoilValue(selectedMovie);
  const onClick = ()=> setShowModal(false)
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
        <Nav className='mb-10' />
      </div>
      {showModal && !!movie ? (
        <Modal {...{onClick, movie}} />
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const genre = ctx.query?.genre;
  const url = `https://api.themoviedb.org/3/${
    requests[genre as keyof typeof requests]?.url ||
    requests.fetchTrending.url
  }&language=fr`.replace(api_key, () => process.env.TMDB_API_KEY!);

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
