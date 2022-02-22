import { Menu } from "@headlessui/react";
import type { FC } from "react";
import useLang from "../../../hooks/useLang";

type Props = {
  value: string;
};

const DropdownMenuItem: FC<Props> = ({ value }) => {
  const onClick = useLang(value);
  return (
    <div className="md:py-1 w-10 md:w-24">
      <Menu.Item as="div">
        {({ active }) => {
          const className = `${
            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
          }  block md:py-2  text-center`;
          return <a {...{ onClick, className }}>{value}</a>;
        }}
      </Menu.Item>
    </div>
  );
};

export default DropdownMenuItem;
