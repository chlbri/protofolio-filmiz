import Head from 'next/head';
import { FC, useEffect } from 'react';
import { useSend, useState } from '../lib/adapters';
import { Requests } from '../lib/ebr/Requests';
import Header from './Header';
import Modal from './modal';
import Nav from './Nav';
import Movies from './Results';

type Props = {
  value: Requests;
};

const _Layout: FC<Props> = ({ value }) => {
  const movies = useState(state => state.context.movies);
  const send = useSend('CHANGE_GENRE');
  useEffect(() => {
    send({ value });
  }, [send, value]);

  //TODO add Internationalization

  return !movies.length ? null : (
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
