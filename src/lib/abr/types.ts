import type Movie from '../ebr/Movie';
import type { Requests } from '../ebr/Requests';

export type TContext = {
  iterator: number;
  selected: Movie | undefined;
  genre: Requests;
  movies: Movie[];
  language: string;
  scrollNavbar: number;
};

export type TEvent =
  | {
      type: 'CHANGE_GENRE';
      value?: Requests;
    }
  | { type: 'SELECT'; value?: Movie }
  | { type: 'CHANGE_LANGUAGE'; value?: string }
  | { type: 'FETCH' }
  | { type: 'SCROLL_NAVBAR'; value: number };
