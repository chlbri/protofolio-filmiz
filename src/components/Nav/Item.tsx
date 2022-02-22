import { useRouter } from "next/dist/client/router";
import { FC } from "react";
import useAppMachine from "../../lib/context/store";
import requests from "../../lib/requests";

export type ItemProps = {
  title: string;
  genre: keyof typeof requests;
};

const Item: FC<ItemProps> = ({ genre, title }) => {
  const send = useAppMachine((store) => store.send);
  const router = useRouter();
  const param = router.query.genre;

  const pink = genre === param || (!param && genre === "fetchTrending");

  const className = `${
    pink ? "text-pink-600" : "hover:text-white"
  } last:pr-24 cursor-pointer  transition duration-100 transform hover:scale-125  active:text-red-400`;

  return (
    <h2
      onClick={() => {
        router.push({ pathname: "/", query: { ...router.query, genre } });
      }}
      className={className}
    >
      {title}
    </h2>
  );
};

export default Item;
