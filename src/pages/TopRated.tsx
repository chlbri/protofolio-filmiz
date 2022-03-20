import Head from 'next/head';
import { FC, useEffect, useState as useState_R } from 'react';
import Header from '../components/Header';
import Modal from '../components/modal';
import Nav from '../components/Nav';
import Movies from '../components/Results';
import { useState } from '../lib/adapters';
import Movie from '../lib/ebr/Movie';
import requests from '../lib/ebr/Requests';

const Home: FC = () => {
  const lang = useState(state => state.context.language);
  const [movies, setMovies] = useState_R<Movie[]>([]);
  //TODO add Internationalization
  useEffect(() => {
    if (!process.env.TMDB_API_KEY)
      throw new Error("La clé de l'api doit être défine");

    const TMDB_API_URL = process.env.TMDB_API_URL;
    if (!TMDB_API_URL) throw new Error("L'url de l'api doit être défine");
    const url = `${TMDB_API_URL}/${requests.TopRated.url}&language=${lang}`;

    async function getF() {
      const _movies = await fetch(url)
        .then(data => data.json())
        .then<Movie[]>(data => data.results)
        .catch(() => []);
      setMovies(_movies);
    }
    getF();
  }, [lang, setMovies]);

  return !movies.length ? null : (
    <div className="bg-[#06202A] text-gray-300">
      <Head>
        <title>@bemedev/filmiz 2.0</title>
      </Head>
      <Header />

      <Nav />

      <Movies movies={movies} />

      <Nav className="pb-5" />
      <Modal />
    </div>
  );
};

export default Home;
