import {
  HomeIcon,
  LightningBoltIcon,
  BadgeCheckIcon,
  CollectionIcon,
  SearchIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { nanoid } from "nanoid";
import { ItemProps } from "./Item";

export const variants: (ItemProps & { key: string })[] = [
  { key: nanoid(), title: "HOME", Icon: HomeIcon },
  {
    key: nanoid(),
    title: "TRENDING",
    Icon: LightningBoltIcon,
  },
  { key: nanoid(), title: "VERIFIED", Icon: BadgeCheckIcon },
  {
    key: nanoid(),
    title: "COLLECTIONS",
    Icon: CollectionIcon,
  },
  { key: nanoid(), title: "SEARCH", Icon: SearchIcon },
  { key: nanoid(), title: "ACCOUNT", Icon: UserIcon },
];
