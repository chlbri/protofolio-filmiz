/** @format */

import { ThumbUpIcon } from '@heroicons/react/outline';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import React, { ComponentProps, forwardRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import 'tippy.js/themes/material.css';
import useIsOverflowed from '../../hooks/useIsOverflowed';
import selectedMovie from '../../utils/atoms/selectedMovie';
import showModal from '../../utils/atoms/showModal';
import Movie from '../../utils/Movie';

type Props = { result: Movie };

const ItemResult = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & Props
>(
  (
    {
      result,
    },

    ref,
  ) => {

    const {
      title,
      original_title,
      overview,
      backdrop_path,
      poster_path,
      media_type,
      release_date,
      vote_count,
    } = result;

    const src = `${process.env.TMDB_IMAGES_URL}${
      backdrop_path || poster_path
    }`;

    
    const [disabled, yRef] = useIsOverflowed();
    const setSelectedMovie = useSetRecoilState(selectedMovie)
    const setShowModal = useSetRecoilState(showModal);

    const onClick = ()=> {
      setSelectedMovie(result);
      setShowModal(true)
    }

    return (
      <>
        <div
          
          className='group cursor-pointer pt-5 mx-3 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 drop-shadow-md'
          {...{onClick, ref}}
        >
          <Tippy
            disabled={disabled}
            content={title || original_title}
            theme='tooltip'
            delay={[1000, 100]}
            duration={[1000, 0]}
          >
            <div
              ref={yRef}
              className='truncate object-contain text-2xl mb-5 py-1 sm:text-3xl text-center text-white transition-all duration-100 ease-in-out group-hover:font-bold'
            >
              {title || original_title}
            </div>
          </Tippy>

          <Image
            className='mt-5 rounded-lg'
            layout='responsive'
            src={src}
            width={1920}
            height={1080}
            alt={original_title}
            objectFit="cover"
          />
          <div>
            <p className='truncate max-w-md px-5'>{overview}</p>
            <p className='flex px-5 items-center opacity-0 group-hover:opacity-75'>
              {!!release_date && `${release_date} •`}{' '}
              <ThumbUpIcon className='h-5 mx-2' /> {vote_count}
            </p>
          </div>
        </div>
        
      </>
    );
  },
);

ItemResult.displayName = 'ItemResult';

export default ItemResult;
