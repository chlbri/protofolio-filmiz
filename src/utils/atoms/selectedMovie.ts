import { atom } from "recoil";
import Movie from "../Movie";

const selectedMovie = atom<Movie|undefined>({key: "selected", default:undefined})

export default selectedMovie;