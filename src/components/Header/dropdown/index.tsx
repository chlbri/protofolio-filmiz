import { Menu, Transition } from '@headlessui/react';
import { SpeakerphoneIcon } from '@heroicons/react/outline';
import { FC, Fragment } from 'react';
import langs from './data.json';
import DropdownMenuItem from './Item';

const DropdownMenu: FC = () => (
  <Menu as="div" className="relative text-left w-26">
    {({ open }) => (
      <>
        <Menu.Button className="justify-center rounded-md  shadow-sm px-4  outline-none border-0">
          <div className="flex flex-col items-center cursor-pointer group w-12 sm:w-20 hover:text-white">
            <SpeakerphoneIcon className="h-8 mb-1 hover:animate-bounce" />
            <p className="opacity-0 group-hover:opacity-100 tracking-widest">
              LANGUE
            </p>
          </div>
        </Menu.Button>

        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="opacity-60 absolute flex flex-row items-center -mt-5 md:-mt-14 md:ml-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
            {langs.map((title, key) => (
              // eslint-disable-next-line react/jsx-key
              <DropdownMenuItem {...{ value: title, key }} />
            ))}
          </Menu.Items>
        </Transition>
      </>
    )}
  </Menu>
);

export default DropdownMenu;
