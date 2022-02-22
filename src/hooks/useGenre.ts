import { useRouter } from "next/router";

export default function useGenre(genre: string) {
  const router = useRouter();
  const param = router.query.genre;

  const pink = genre === param || (!param && genre === "fetchTrending");

  const className = `${
    pink ? "text-pink-600" : "hover:text-white"
  } last:pr-24 cursor-pointer  transition duration-100 transform hover:scale-125 active:text-red-400`;
  return {
    onClick: () => {
      router.push({
        pathname: "/",
        query: { ...router.query, genre },
      });
    },
    className,
  };
}
