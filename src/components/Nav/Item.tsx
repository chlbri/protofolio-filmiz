/** @format */

import { useRouter } from "next/dist/client/router";
import { FC, useContext } from "react";
import Context from "../../lib/context";
import requests from "../../lib/requests";

export type ItemProps = {
  title: string;
  genre: keyof typeof requests;
};

const Item: FC<ItemProps> = ({ genre, title }) => {
  const [state, send] = useContext(Context);
  const router = useRouter();
  const param = router.query.genre;

  const pink = genre === param || (!param && genre === "fetchTrending");

  const className = `${
    pink ? "text-pink-600" : "hover:text-white"
  } last:pr-24 cursor-pointer  transition duration-100 transform hover:scale-125  active:text-red-400`;

  return (
    <h2
      onClick={() => {
        console.log(state.context.language);
        send({ type: "fetch", value: genre });
      }}
      className={className}
    >
      {title}
    </h2>
  );
};

export default Item;
