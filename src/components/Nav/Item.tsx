import type { FC } from 'react';
import useGenre from '../../hooks/useGenre';
import { Requests } from '../../lib/ebr/Requests';

export type ItemProps = {
  title: string;
  genre: Requests;
};

const Item: FC<ItemProps> = ({ genre, title }) => {
  const { onClick, className } = useGenre(genre);
  return <h2 {...{ onClick, className }}>{title}</h2>;
};

export default Item;
