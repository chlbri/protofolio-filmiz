import { Menu } from '@headlessui/react';
import { FC } from 'react';
import { useContext } from '../../../lib/context';

type Props = {
  value: string;
};

const DropdownMenuItem: FC<Props> = ({ value }) => {
  const [_, send] = useContext();

  const onClick = () => {
    send({ type: 'changeLanguage', value });
  };
  return (
    <div className='py-1 w-10 md:w-24'>
      <Menu.Item as='div'>
        {({ active }) => (
          <a
            {...{ onClick }}
            className={`${
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
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
