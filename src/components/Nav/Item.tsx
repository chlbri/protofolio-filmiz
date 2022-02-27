import type { FC } from 'react';
import useGenre from '../../hooks/useGenre';
import requests from '../../lib/ebr/Requests';

export type ItemProps = {
  title: string;
  genre: keyof typeof requests;
};

const Item: FC<ItemProps> = ({ genre, title }) => {
  const { onClick, className } = useGenre(genre);
  return <h2 {...{ onClick, className }}>{title}</h2>;
};

export default Item;
