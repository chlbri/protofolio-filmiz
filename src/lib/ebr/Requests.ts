const env = process.env.TMDB_API_KEY;

const requests = {
  fetchTrending: {
    title: "Tendance",
    url: `trending/movie/week?api_key=${env}&sort_by=popularity.desc`,
  },
  fetchTopRated: {
    title: "Les mieux notés",
    url: `movie/top_rated?api_key=${env}&sort_by=popularity.desc`,
  },
  fetchActionsMovies: {
    title: "Action",
    url: `discover/movie?api_key=${env}&with_genres=28`,
  },
  fetchComedyMovies: {
    title: "Comédie",
    url: `discover/movie?api_key=${env}&with_genres=35`,
  },
  fetchHorrorMovies: {
    title: "Horreur",
    url: `discover/movie?api_key=${env}&with_genres=27`,
  },
  fetchRomanceMovies: {
    title: "Amour",
    url: `discover/movie?api_key=${env}&with_genres=10749`,
  },
  fetchMystery: {
    title: "Mystère",
    url: `discover/movie?api_key=${env}&with_genres=9648`,
  },
  fetchSciFi: {
    title: "Sci-Fi",
    url: `discover/movie?api_key=${env}&with_genres=878`,
  },
  fetchWestern: {
    title: "Western",
    url: `discover/movie?api_key=${env}&with_genres=37`,
  },
  fetchAnimation: {
    title: "Animation",
    url: `discover/movie?api_key=${env}&with_genres=16`,
  },
  fetchTV: {
    title: "Téléfilm",
    url: `discover/movie?api_key=${env}&with_genres=10770`,
  },
} as const;

export default requests;

export type Requests = keyof typeof requests;

export function isRequest(value: any): value is Requests {
  const keys = Object.keys(requests);
  return !!value && typeof value === "string" && keys.includes(value);
}