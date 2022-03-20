const env = process.env.TMDB_API_KEY;

const requests = {
  Trending: {
    title: 'Tendance',
    url: `trending/movie/week?api_key=${env}&sort_by=popularity.desc`,
  },
  TopRated: {
    title: 'Les mieux notés',
    url: `movie/top_rated?api_key=${env}&sort_by=popularity.desc`,
  },
  ActionsMovies: {
    title: 'Action',
    url: `discover/movie?api_key=${env}&with_genres=28`,
  },
  ComedyMovies: {
    title: 'Comédie',
    url: `discover/movie?api_key=${env}&with_genres=35`,
  },
  HorrorMovies: {
    title: 'Horreur',
    url: `discover/movie?api_key=${env}&with_genres=27`,
  },
  RomanceMovies: {
    title: 'Amour',
    url: `discover/movie?api_key=${env}&with_genres=10749`,
  },
  Mystery: {
    title: 'Mystère',
    url: `discover/movie?api_key=${env}&with_genres=9648`,
  },
  SciFi: {
    title: 'Sci-Fi',
    url: `discover/movie?api_key=${env}&with_genres=878`,
  },
  Western: {
    title: 'Western',
    url: `discover/movie?api_key=${env}&with_genres=37`,
  },
  Animation: {
    title: 'Animation',
    url: `discover/movie?api_key=${env}&with_genres=16`,
  },
  TV: {
    title: 'Téléfilm',
    url: `discover/movie?api_key=${env}&with_genres=10770`,
  },
} as const;

export default requests;

export type Requests = keyof typeof requests;

export function isRequest(value: any): value is Requests {
  const keys = Object.keys(requests);
  return !!value && typeof value === 'string' && keys.includes(value);
}
