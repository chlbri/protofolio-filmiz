import { Menu, Transition } from '@headlessui/react';
import { SpeakerphoneIcon } from '@heroicons/react/outline';
import { FC, Fragment } from 'react';
import langs from './data.json';
import DropdownMenuItem from './Item';

const DropdownMenu: FC = () => (
  <Menu as="div" className="w-26 relative text-left">
    {({ open }) => (
      <>
        <Menu.Button className="justify-center rounded-md  border-0 px-4  shadow-sm outline-none">
          <div className="group flex w-12 cursor-pointer flex-col items-center hover:text-white sm:w-20">
            <SpeakerphoneIcon className="mb-1 h-8 hover:animate-bounce" />
            <p className="tracking-widest opacity-0 group-hover:opacity-100">
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
          <Menu.Items className="absolute -mt-5 flex cursor-pointer flex-row items-center rounded-md bg-white opacity-60 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:-mt-14 md:ml-28">
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
