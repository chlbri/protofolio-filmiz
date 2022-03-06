import { Menu } from '@headlessui/react';
import type { FC } from 'react';
import { useSend } from '../../../lib/adapters';

type Props = {
  value: string;
};

const DropdownMenuItem: FC<Props> = ({ value }) => {
  const send = useSend('CHANGE_LANGUAGE');
  const onClick = () => send({ value });
  return (
    <div className="w-10 md:w-24 md:py-1">
      <Menu.Item as="div">
        {({ active }) => {
          const className = `${
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
          }  block md:py-2  text-center`;
          return <a {...{ onClick, className }}>{value}</a>;
        }}
      </Menu.Item>
    </div>
  );
};

export default DropdownMenuItem;
