/** @format */

import { ComponentProps, FC } from "react";

export type ItemProps = {
  title: string;
  Icon: (props: ComponentProps<"svg">) => JSX.Element;
};

export const Item: FC<ComponentProps<"div"> & ItemProps> = ({
  title,
  Icon,
  key,
}) => {
  return (
    <div
      key={key}
      className="flex flex-col items-center cursor-pointer group w-12 sm:w-20 hover:text-white"
    >
      <Icon className="h-8 mb-1 hover:animate-bounce" />
      <p className="opacity-0 group-hover:opacity-100 tracking-widest">
        {title}
      </p>
    </div>
  );
};

export default Item;
