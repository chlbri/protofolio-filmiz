import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import useAppMachine from "../../../lib/context/store";

type Props = {
  value: string;
};

const DropdownMenuItem: FC<Props> = ({ value }) => {
  const send = useAppMachine((store) => store.send);
  const router = useRouter();

  const onClick = () => {
    send({ type: "changeLanguage", value });
    router.push(
      {
        pathname: "/",
        query: { ...router.query, lang: value },
      },
      "/"
    );
  };
  return (
    <div className="py-1 w-10 md:w-24">
      <Menu.Item as="div">
        {({ active }) => (
          <a
            {...{ onClick }}
            className={`${
              active ? "bg-gray-100 text-gray-900" : "text-gray-700"
            }  block py-2  text-center`}
          >
            {value}
          </a>
        )}
      </Menu.Item>
    </div>
  );
};

export default DropdownMenuItem;
