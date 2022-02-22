import { ThumbUpIcon } from "@heroicons/react/outline";
import type { FC } from "react";
import useModal from "../hooks/useModal";

const Modal: FC = () => {
  const { movie, refC, onClick } = useModal();

  return !movie ? null : (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="bg-[#06202A] relative w-auto my-6 mx-2 md:mx-auto max-w-3xl text-white rounded-2xl max-h-screen overflow-hidden">
          {/*content*/}
          <div
            ref={refC}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none "
          >
            {/*header*/}
            <div className="flex items-center justify-center p-3 md:p-5 border-b border-solid border-blueGray-200">
              <h3 className="text-2xl md:text-3xl font-semibold text-center">
                {movie.title}
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-2 max-h-96 md:max-h-screen overflow-y-auto">
              <p className="my-3 px-5 md:text-lg leading-relaxed">
                {!movie.overview || movie.overview.trim() === ""
                  ? "Pas de description"
                  : movie.overview}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-between  md:pl-10 pr-4 md:pr-10 border-t border-solid border-blueGray-200 pt-3 rounded-b text-sm md:text-lg pb-4">
              <p className="flex px-5 items-center opacity-75">
                {!!movie.release_date && `${movie.release_date} •`}{" "}
                <ThumbUpIcon className="h-5 mx-1 md:mx-2" /> {movie.vote_count}
              </p>
              <button
                className=" text-red-500 background-transparent font-bold uppercase  outline-none focus:outline-none ease-linear transition-all duration-150"
                {...{ type: "button", onClick }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-70 fixed inset-0 z-20 bg-black"></div>
    </div>
  );
};

export default Modal;
