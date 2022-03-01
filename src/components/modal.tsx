import { ThumbUpIcon } from '@heroicons/react/outline';
import { FC, MutableRefObject } from 'react';
import useModal from '../hooks/useModal';
import Movie from '../lib/ebr/Movie';

type _Props = Pick<
  Movie,
  'title' | 'overview' | 'release_date' | 'vote_count'
> & {
  refC: MutableRefObject<any>;
  onClick: () => void;
};

const _Modal: FC<_Props> = ({
  title,
  overview,
  release_date,
  vote_count,
  refC,
  onClick,
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none ">
        <div className="relative my-6 mx-2 max-h-screen w-auto max-w-3xl overflow-hidden rounded-2xl bg-[#06202A] text-white md:mx-auto">
          {/*content*/}
          <div
            ref={refC}
            className="relative flex w-full flex-col rounded-lg border-0 shadow-lg outline-none focus:outline-none "
          >
            {/*header*/}
            <div className="border-blueGray-200 flex items-center justify-center border-b border-solid p-3 md:p-5">
              <h3 className="text-center text-2xl font-semibold md:text-3xl">
                {title}
              </h3>
            </div>
            {/*body*/}
            <div className="relative max-h-96 overflow-y-auto p-2 md:max-h-screen">
              <p className="my-3 px-5 leading-relaxed md:text-lg">
                {!overview || overview.trim() === ''
                  ? 'Pas de description'
                  : overview}
              </p>
            </div>
            {/*footer*/}
            <div className="border-blueGray-200 flex items-center  justify-between rounded-b border-t border-solid pr-4 pt-3 pb-4 text-sm md:pl-10 md:pr-10 md:text-lg">
              <p className="flex items-center px-5 opacity-75">
                {!!release_date && `${release_date} •`}{' '}
                <ThumbUpIcon className="mx-1 h-5 md:mx-2" /> {vote_count}
              </p>
              <button
                className=" background-transparent font-bold uppercase text-red-500  outline-none transition-all duration-150 ease-linear focus:outline-none"
                {...{ type: 'button', onClick }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-20 bg-black opacity-70"></div>
    </>
  );
};

const Modal: FC = () => {
  const { movie, refC, onClick } = useModal();

  return !movie ? null : <_Modal {...{ ...movie, refC, onClick }} />;
};

export default Modal;
