module.exports = {
  images: {
    domains: ['pixabay.com', 'images.pexels.com', 'image.tmdb.org'],
  },
  env: {
    TMDB_IMAGES_URL: process.env.TMDB_IMAGES_URL,
    TMDB_API_URL: process.env.TMDB_API_URL,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  reactStrictMode: true,
};
