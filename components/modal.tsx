/** @format */

import { FC, useRef } from 'react';
import Movie from '../utils/Movie';
import { ThumbUpIcon } from '@heroicons/react/outline';

type Props = {
  onClick: () => void;
  movie: Movie;
};

const Modal: FC<Props> = ({ onClick, movie }) => {
  const type = 'button';
  const ref = useRef<HTMLDivElement>(null);
  const overview =
    !movie.overview || movie.overview.trim() === ''
      ? 'Pas de description'
      : movie.overview;
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        if (!ref.current?.contains(e.currentTarget)) onClick();
      }}
    >
      <div
        ref={ref}
        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
      >
        <div className='bg-[#06202A] relative w-auto my-6 mx-auto max-w-3xl text-white rounded-2xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <h3 className='text-3xl font-semibold text-center'>{movie.title}</h3>
            </div>
            {/*body*/}
            <div className='relative p-2 flex-auto'>
              <p className='my-3 px-5 text-lg leading-relaxed text-justify'>
                {overview}
              </p>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-between pr-3 pl-10 border-t border-solid border-blueGray-200 pt-2 rounded-b'>
              <p className='flex px-5 items-center opacity-75'>
                {!!movie.release_date && `${movie.release_date} •`}{' '}
                <ThumbUpIcon className='h-5 mx-2' /> {movie.vote_count}
              </p>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                {...{ type, onClick }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-70 fixed inset-0 z-20 bg-black'></div>
    </div>
  );
};

export default Modal;
