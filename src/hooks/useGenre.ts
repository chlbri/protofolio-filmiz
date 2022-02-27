import { useRouter } from "next/router";
import useAppMachine from "../lib/abr/store";
import { Requests } from "../lib/ebr/Requests";

export default function useGenre(value: Requests) {
  const send = useAppMachine((store) => store.send);
  const param = useRouter().query.genre;

  const pink = value === param || (!param && value === "fetchTrending");

  const className = `${
    pink ? "text-pink-600" : "hover:text-white"
  } last:pr-24 cursor-pointer  transition duration-100 transform hover:scale-125 active:text-red-400`;
  return {
    onClick: () => {
      send({ type: "CHANGE_GENRE", value });
    },
    className,
  };
}
