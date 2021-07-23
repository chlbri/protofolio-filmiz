import React from "react";
import { variants } from "./data";
import Dropdown from "./dropdown";
import Item from "./Item";

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center">
      <div className="flex flex-grow items-center justify-evenly max-w-2xl">
        {variants.map(Item)}
        <Dropdown />
      </div>
    </header>
  );
}
