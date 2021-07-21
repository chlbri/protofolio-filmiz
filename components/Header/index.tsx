import React from 'react';
import { variants } from './data';
import Item from './Item';

export default function Header() {
  return (
    <header className='flex flex-col sm:flex-row m-5 justify-between items-center'>
      <div className='flex flex-grow justify-evenly max-w-2xl'>
        {variants.map(Item)}
      </div>

    </header>
  );
}
