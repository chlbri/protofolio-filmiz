import { Menu } from "@headlessui/react";
import { useRouter } from "next/dist/client/router";
import { FC, useContext } from "react";
import Context from "../../../lib/context";

type Props = {
  value: string;
};

const ItemDrop: FC<Props> = ({ value }) => {
  const [_, send] = useContext(Context);

  const onClick = () => {
    send({ type: "changeLanguage", value });
  };
  return (
    <div className="py-1 w-4 sm:w-20">
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

export default ItemDrop;
