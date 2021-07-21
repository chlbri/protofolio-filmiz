/** @format */

import { useRouter } from 'next/dist/client/router';
import { ComponentProps, FC } from 'react';

export type ItemProps = {
  title: string;
};

const Item: FC<ComponentProps<'div'> & ItemProps> = ({ id, title }) => {
  const route = `/?genre=${id}`;
  const router = useRouter();
  const pink =
    route === router.asPath ||
    (router.asPath === '/' && id === 'fetchTrending');
  console.log('Full :', router);
  console.log('esPath :', router.asPath);

  const className = `${
    pink ? 'text-pink-600' : 'hover:text-white'
  } last:pr-24 cursor-pointer  transition duration-100 transform hover:scale-125  active:text-red-400`;

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
