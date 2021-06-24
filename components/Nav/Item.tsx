import { useRouter } from 'next/dist/client/router';
import React, { ComponentProps, FC } from 'react';
import requests from '../../utils/requests';

export type ItemProps = {
  title: string;
  url: string;
};

const Item: FC<ComponentProps<'div'> & ItemProps> = ({
  id,
  title,
  url,
}) => {
  // #region Preparing

  const route = `/?genre=${id}`;
  const router = useRouter();
  const pinkCondition =
    route === router.asPath ||
    (title === requests.fetchTrending.title && router === '/');

  // #endregion

  const className = `last:pr-24 cursor-pointer  transition duration-100 transform hover:scale-125 ${
    pinkCondition ? 'text-pink-600' : 'hover:text-white'
  } active:text-red-400`;

  const onClick = () => {
    router.push(route);
  };

  return <h2 {...{ onClick, className }}>{title}</h2>;
};

export default Item;
