import { useRouter } from 'next/dist/client/router';
import React, { ComponentProps, FC } from 'react';

export type ItemProps = {
  title: string;
  url: string;
};

const Item: FC<ComponentProps<'div'> & ItemProps> = ({
  id,
  title,
  url,
}) => {
  const route = `/?genre=${id}`;
  const router = useRouter();
  const pink =
    route === router.asPath ||
    (router.asPath === '/' && title === 'Trending');
  let className = `last:pr-24 cursor-pointer  transition duration-100 transform hover:scale-125 ${
    pink ? 'text-pink-600' : 'hover:text-white'
  } active:text-red-400`;

  return (
    <h2
      onClick={() => {
        router.push(route);
      }}
      className={className}
    >
      {title}
    </h2>
  );
};

export default Item;

