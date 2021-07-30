import { ComponentProps, FC } from "react";

export type HeaderItemProps = {
  title: string;
  Icon: FC<Pick<ComponentProps<"svg">, "className">>;
  key?: ComponentProps<"div">["key"];
};

const HeaderItem: FC<HeaderItemProps> = ({ title, Icon, key }) => (
  <div
    {...{ key }}
    className="flex flex-col items-center cursor-pointer group w-12 sm:w-20 hover:text-white"
  >
    <Icon className="h-8 mb-1 hover:animate-bounce" />
    <p className="opacity-0 group-hover:opacity-100 tracking-widest">{title}</p>
  </div>
);

export default HeaderItem;
