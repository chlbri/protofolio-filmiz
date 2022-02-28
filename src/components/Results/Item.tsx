import { ThumbUpIcon } from '@heroicons/react/outline';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import { forwardRef, memo } from 'react';
import 'tippy.js/themes/material.css';
import useResult from '../../hooks/useResult';
import type Movie from '../../lib/ebr/Movie';

type Props = { result: Movie };

const ItemResult = forwardRef<HTMLDivElement, Props>(({ result }, ref) => {
  const {
    title,
    original_title,
    overview,
    // media_type,
    release_date,
    vote_count,
  } = result;

  const { src, yRef, disabled, onClick } = useResult(result);

  return (
    <>
      <div
        className="cursor-pointer pt-5 mx-3 transition duration-200 ease-in transform sm:hover:scale-105 drop-shadow-md"
        {...{ onClick, ref }}
      >
        <div className="group align-middle">
          <Tippy
            disabled={disabled}
            content={title || original_title}
            delay={[700, 100]}
            duration={[1000, 0]}
            className="md:-mb-3 px-2 py-1 rounded-md bg-green-900 text-white bg-opacity-60 text-center"
          >
            <div>
              <div
                ref={yRef}
                className="truncate text-center text-2xl mb-5 py-1  sm:text-3xl  text-white transition-all duration-100 ease-in-out group-hover:font-bold"
              >
                {title || original_title}
              </div>
            </div>
          </Tippy>

          <Image
            className="mt-5 rounded-lg"
            layout="responsive"
            src={src}
            width={1920}
            height={1080}
            alt={original_title}
            objectFit="cover"
          />
          <div>
            <p className="truncate max-w-md px-5">{overview}</p>
            <p className="flex px-5 items-center opacity-0 group-hover:opacity-75">
              {!!release_date && `${release_date} •`}{' '}
              <ThumbUpIcon className="h-5 mx-2" /> {vote_count}
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

ItemResult.displayName = 'ItemResult';

export function sleep(millis: number) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

export default memo(ItemResult);
