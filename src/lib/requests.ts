const out = {
  fetchTrending: {
    title: 'Tendance',
    url: `trending/movie/week?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc`,
  },
  fetchTopRated: {
    title: 'Les mieux notés',
    url: `movie/top_rated?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc`,
  },
  fetchActionsMovies: {
    title: 'Action',
    url: `discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=28`,
  },
  fetchComedyMovies: {
    title: 'Comédie',
    url: `discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=35`,
  },
  fetchHorrorMovies: {
    title: 'Horreur',
    url: `discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=27`,
  },
  fetchRomanceMovies: {
    title: 'Amour',
    url: `discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=10749`,
  },
  fetchMystery: {
    title: 'Mystère',
    url: `discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=9648`,
  },
  fetchSciFi: {
    title: 'Sci-Fi',
    url: `discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=878`,
  },
  fetchWestern: {
    title: 'Western',
    url: `discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=37`,
  },
  fetchAnimation: {
    title: 'Animation',
    url: `discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=16`,
  },
  fetchTV: {
    title: 'Téléfilm',
    url: `discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=10770`,
  },
} as const;

export default out;
