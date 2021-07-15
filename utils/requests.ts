export const api_key = "$API$";

const out = {
  fetchTrending: {
    title: 'Trending',
    url: `trending/movie/week?api_key=${api_key}&sort_by=popularity.desc`,
  },
  fetchTopRated: {
    title: 'Top Rated',
    url: `movie/top_rated?api_key=${api_key}&sort_by=popularity.desc`,
  },
  fetchActionsMovies: {
    title: 'Action',
    url: `discover/movie?api_key=${api_key}&with_genres=28`,
  },
  fetchComedyMovies: {
    title: 'Comedy',
    url: `discover/movie?api_key=${api_key}&with_genres=35`,
  },
  fetchHorrorMovies: {
    title: 'Horror',
    url: `discover/movie?api_key=${api_key}&with_genres=27`,
  },
  fetchRomanceMovies: {
    title: 'Romance',
    url: `discover/movie?api_key=${api_key}&with_genres=10749`,
  },
  fetchMystery: {
    title: 'Mystery',
    url: `discover/movie?api_key=${api_key}&with_genres=9648`,
  },
  fetchSciFi: {
    title: 'Sci-Fi',
    url: `discover/movie?api_key=${api_key}&with_genres=878`,
  },
  fetchWestern: {
    title: 'Western',
    url: `discover/movie?api_key=${api_key}&with_genres=37`,
  },
  fetchAnimation: {
    title: 'Animation',
    url: `discover/movie?api_key=${api_key}&with_genres=16`,
  },
  fetchTV: {
    title: 'TV Movies',
    url: `discover/movie?api_key=${api_key}&with_genres=10770`,
  },
};

export default out;
