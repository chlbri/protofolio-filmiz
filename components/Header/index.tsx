import Image from 'next/image';
import React from 'react';
import hulu_logo from '../../public/images/hulu_logo.jpg';
import { variants } from './data';
import Item from './Item';

export default function Header() {
  return (
    <header className='flex flex-col sm:flex-row m-5 justify-between items-center'>
      <div className='flex flex-grow justify-evenly max-w-2xl'>
        {variants.map(Item)}
      </div>
      <Image
        src={hulu_logo}
        alt='A nice Logo'
        className='object-contain'
      />
    </header>
  );
}
