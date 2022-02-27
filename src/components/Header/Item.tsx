import type { ComponentProps, FC, ReactElement } from 'react';

export type HeaderItemProps = {
  title: string;
  children: ReactElement;
  key?: ComponentProps<'div'>['key'];
};

const HeaderItem: FC<HeaderItemProps> = ({ title, children, key }) => {
  return (
    <div
      {...{ key }}
      className="flex flex-col items-center cursor-pointer group w-12 sm:w-20 hover:text-white"
    >
      {children}
      <p className="opacity-0 group-hover:opacity-100 tracking-widest">
        {title}
      </p>
    </div>
  );
};

export default HeaderItem;
