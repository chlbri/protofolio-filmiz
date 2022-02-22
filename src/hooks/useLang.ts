import { useRouter } from "next/router";

export default function useLang(lang: string) {
  const router = useRouter();
  return () => {
    router.push(
      {
        pathname: "/",
        query: { ...router.query, lang },
      }
    );
  };
}
