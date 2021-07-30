import { FC } from "react";
import { variants } from "./data";
import Dropdown from "./dropdown";
import HeaderItem from "./Item";

const Header: FC = () => (
  <header className="flex flex-col sm:flex-row m-5 justify-between items-center">
    <div className="flex flex-grow items-center justify-evenly max-w-2xl">
      {variants.map(HeaderItem)}
      <Dropdown />
    </div>
  </header>
);

export default Header;
