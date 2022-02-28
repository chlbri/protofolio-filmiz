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
        className="mx-3 transform cursor-pointer pt-5 drop-shadow-md transition duration-200 ease-in sm:hover:scale-105"
        {...{ onClick, ref }}
      >
        <div className="group align-middle">
          <Tippy
            disabled={disabled}
            content={title || original_title}
            delay={[700, 100]}
            duration={[1000, 0]}
            className="rounded-md bg-green-900 bg-opacity-60 px-2 py-1 text-center text-white md:-mb-3"
          >
            <div>
              <div
                ref={yRef}
                className="mb-5 truncate py-1 text-center text-2xl  text-white  transition-all duration-100 ease-in-out group-hover:font-bold sm:text-3xl"
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
            <p className="max-w-md truncate px-5">{overview}</p>
            <p className="flex items-center px-5 opacity-0 group-hover:opacity-75">
              {!!release_date && `${release_date} •`}{' '}
              <ThumbUpIcon className="mx-2 h-5" /> {vote_count}
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
