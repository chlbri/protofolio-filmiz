import Movie from '../ebr/Movie';
import {
  GENRE_KEY,
  LANGUAGE_KEY,
  MOVIES_KEY,
  SCROLL_KEY,
} from '../ebr/others';
import { Requests } from '../ebr/Requests';

export function getLocalLanguage() {
  const _language =
    typeof window !== 'undefined'
      ? localStorage.getItem(LANGUAGE_KEY)
      : null;

  return _language ?? 'fr';
}

export function getLocalGenre() {
  const _genre =
    typeof window !== 'undefined' ? localStorage.getItem(GENRE_KEY) : null;

  return (_genre ?? 'Trending') as Requests;
}

export function getLocalScroll() {
  const _scrollNavbar =
    typeof window !== 'undefined'
      ? localStorage.getItem(SCROLL_KEY)
      : null;
  return Number.parseInt(_scrollNavbar ?? '0');
}

export function getLocalMovies(genre: Requests, language: string) {
  const _movies =
    typeof window !== 'undefined'
      ? localStorage.getItem(MOVIES_KEY)
      : null;
  return (
    _movies ? JSON.parse(_movies)?.[genre]?.[language]?.results : []
  ) as Movie[];
}
