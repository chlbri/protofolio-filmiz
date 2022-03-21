import Head from 'next/head';
import { FC, useEffect } from 'react';
import { useSend, useState } from '../lib/adapters';
import Header from './Header';
import Modal from './modal';
import Nav from './Nav';
import Movies from './Results';

const _Layout: FC = () => {
  const movies = useState(state => state.context.movies);
  const load = useSend('LOAD');
  useEffect(() => {
    load({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#06202A] text-gray-300">
      <Head>
        <title>filmiz 2.0</title>
      </Head>
      <Header />

      <Nav />

      <Movies movies={movies} />

      <Nav className="pb-5" />
      <Modal />
    </div>
  );
};

export default _Layout;
