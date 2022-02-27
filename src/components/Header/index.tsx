import type { FC } from 'react';
import Dropdown from './dropdown';

const Header: FC = () => (
  <header className="bg-[#06202A] flex flex-col sm:flex-row pt-5 justify-between items-center">
    <div className="flex pl-4 md:pl-20 ">
      {/* <HeaderItem title="ACCUEIL">
        <HomeIcon className="h-8 mb-1 hover:animate-bounce" />
      </HeaderItem>
      <HeaderItem title="ACCUEIL">
        <LightningBoltIcon className="h-8 mb-1 hover:animate-bounce" />
      </HeaderItem> */}
      <Dropdown />
    </div>
  </header>
);

export default Header;
