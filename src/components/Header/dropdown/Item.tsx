import { Menu } from '@headlessui/react';
import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';

type Props = {
  lang: string;
};

const ItemDrop: FC<Props> = ({ lang }) => {
  const router = useRouter();
  const query = !!router.query.genre
    ? {
        genre: router.query.genre,
        lang,
      }
    : { lang };

  const onClick = () => {
    router.push({
      pathname: '/',
      query,
    });
  };
  return (
    <div className='py-1 w-4 sm:w-20'>
      <Menu.Item>
        {({ active }) => (
          <a
            {...{ onClick }}
            className={`${
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
            }  block py-2  text-center`}
          >
            {lang}
          </a>
        )}
      </Menu.Item>
    </div>
  );
};

export default ItemDrop;
