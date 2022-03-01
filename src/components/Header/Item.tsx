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
      className="group flex w-12 cursor-pointer flex-col items-center hover:text-white sm:w-20"
    >
      {children}
      <p className="tracking-widest opacity-0 group-hover:opacity-100">
        {title}
      </p>
    </div>
  );
};

export default HeaderItem;
