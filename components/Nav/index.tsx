import React from "react";
import requests from "../../utils/requests";
import Item from "./Item";

export default function Nav() {
  return (
    <nav className="relative">
      <div className="flex text-2xl py-2 px-10 sm:px-20 whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll no-scrollbar">
        {Object.entries(requests).map(([id, { title, url }]) => (
          // eslint-disable-next-line react/jsx-key
          <Item {...{ key: id, id, title, url }} />
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#06202A]  h-10 w-1/12" />
    </nav>
  );
}
