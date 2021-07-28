import { HomeIcon, LightningBoltIcon } from "@heroicons/react/outline";
import { nanoid } from "nanoid";
import { HeaderItemProps } from "./Item";

export const variants: (HeaderItemProps & { key: string })[] = [
  { key: nanoid(), title: "ACCUEIL", Icon: HomeIcon },
  {
    key: nanoid(),
    title: "TENDANCES",
    Icon: LightningBoltIcon,
  },
  // { key: nanoid(), title: 'VERIFIED', Icon: BadgeCheckIcon },
  // {
  //   key: nanoid(),
  //   title: 'COLLECTIONS',
  //   Icon: CollectionIcon,
  // },
  // { key: nanoid(), title: 'SEARCH', Icon: SearchIcon },
  // { key: nanoid(), title: 'ACCOUNT', Icon: UserIcon },
  // { key: nanoid(), title: 'LANGUE', Icon: SpeakerphoneIcon },
];

export const langs = ["fr", "en"];
