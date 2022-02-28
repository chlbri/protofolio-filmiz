import type { FC } from 'react';
import type { Requests } from '../../lib/ebr/Requests';
import requests from '../../lib/ebr/Requests';
import Item from './Item';

type Props = {
  className?: string;
};

const Nav: FC<Props> = ({ className = '' }) => (
  <nav className={'relative ' + className}>
    <div className="flex space-x-10 overflow-x-scroll whitespace-nowrap py-2 px-10 text-2xl scrollbar-hide sm:space-x-20 sm:px-20">
      {Object.entries(requests).map(([id, { title, url }]) => (
        // eslint-disable-next-line react/jsx-key
        <Item
          {...{
            key: id,
            genre: id as Requests,
            title,
            url,
          }}
        />
      ))}
    </div>
    <div className="absolute top-0 right-0 h-10 w-1/12  bg-gradient-to-l from-[#06202A]" />
  </nav>
);

export default Nav;
