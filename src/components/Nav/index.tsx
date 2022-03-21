import { FC, useEffect, useRef } from 'react';
import { useSend, useState } from '../../lib/adapters';
import type { Requests } from '../../lib/ebr/Requests';
import requests from '../../lib/ebr/Requests';
import Item from './Item';

type Props = {
  className?: string;
};

const Nav: FC<Props> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const left = useState(state => state.context.scrollNavbar);

  const scroll = useSend('SCROLL_NAVBAR');
  useEffect(() => {
    ref.current?.scrollTo({
      left,
    });
    console.log('arrrhhh');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);
  return (
    <nav className={'relative ' + className}>
      <div
        ref={ref}
        className="flex space-x-10 overflow-x-scroll whitespace-nowrap py-2 px-10 text-2xl scrollbar-hide sm:space-x-20 sm:px-20"
        onScroll={e => {
          scroll({ value: e.currentTarget.scrollLeft });
        }}
      >
        {Object.entries(requests).map(([id, { title }]) => (
          // eslint-disable-next-line react/jsx-key
          <Item
            {...{
              key: id,
              genre: id as Requests,
              title,
            }}
          />
        ))}
      </div>
      <div className="absolute top-0 right-0 h-10 w-1/12  bg-gradient-to-l from-[#06202A]" />
    </nav>
  );
};

export default Nav;
