// let BASE_URL = "https://cinehub-backend-production.up.railway.app";
let BASE_URL = "http://localhost:9090";

// URL endpoints
const UPCOMING_URL = `${BASE_URL}/peliculas/upcoming`; // Obtener próximos estrenos
const PLAYING_URL = `${BASE_URL}/peliculas/playing`; // Obtener películas en cartelera
const TRENDING_DAY_URL = `${BASE_URL}/peliculas/trendingDayMovies`; // Obtener películas trending del día
const TOP_MOVIES_URL = `${BASE_URL}/peliculas/topMovies`; // Obtener películas top rated
const MOVIE_POPULAR_URL = `${BASE_URL}/peliculas/popularMovies`; // Obtener películas populares
const MOVIE_DISCOVER_URL = `${BASE_URL}/peliculas/discoverGenre`; // Obtener películas por género
const MOVIE_BY_NAME_URL = `${BASE_URL}/peliculas/movie`; // Obtener películas por nombre
const MOVIE_TRAILER_URL = `${BASE_URL}/trailer`; // Obtener URL del trailer
const MOVIE_DETAILS_URL = `${BASE_URL}/peliculas/details`; // Obtener detalles de una película
const MOVIE_RELATED_URL = `${BASE_URL}/peliculas/relatedMovies`; // Obtener películas relacionadas
const FAMOUS_MOVIES_URL = `${BASE_URL}/peliculas/famousMovies`; // Obtener filmografía de actor
const FAMOUS_DETAILS_URL = `${BASE_URL}/famous`; // Obtener detalles del actor seleccionado
const MOVIE_CAST_URL = `${BASE_URL}/famous/credits`; // Obtener créditos de una película
const FAMOUS_POPULAR_URL = `${BASE_URL}/famous/mostPopular`; // Obtener actores famosos más populares



// Obtener próximos estrenos
export async function getUpcoming() {
  const res = await fetch(UPCOMING_URL);
  return res.json();
}

// Obtener películas en cartelera
export async function getPlaying(page = 1) {
  const res = await fetch(`${PLAYING_URL}/${page}`);
  return res.json();
}

// Obtener películas trending del día
export async function getTrendingDayMovies(page = 1) {
  const res = await fetch(`${TRENDING_DAY_URL}/${page}`);
  return res.json();
}

// Obtener películas top rated
export async function getTopMovies(page = 1) {
  const res = await fetch(`${TOP_MOVIES_URL}/${page}`);
  return res.json();
}

// Obtener detalles de una película
export async function getMovieDetails(id) {
  const res = await fetch(`${MOVIE_DETAILS_URL}/${id}`);
  return res.json();
}

// Obtener créditos de una película
export async function getMovieCast(id) {
  const res = await fetch(`${MOVIE_CAST_URL}/${id}`);
  return res.json();
}

// Obtener películas por género
export async function getMoviesByGenre(genreId, page = 1) {
  const res = await fetch(`${MOVIE_DISCOVER_URL}/${genreId}/${page}`);
  return res.json();
}

// Obtener películas por nombre
export async function getMoviesByName(name) {
  const res = await fetch(`${MOVIE_BY_NAME_URL}/${name}`);
  return res.json();
}

// Obtener películas relacionadas
export async function getRelatedMovies(id) {
  const res = await fetch(`${MOVIE_RELATED_URL}/${id}`);
  return res.json();
}

// Obtener películas populares
export async function getPopularMovies(page) {
  const res = await fetch(`${MOVIE_POPULAR_URL}/${page}`);
  return res.json();
}

// Obtener URL del trailer
export async function getUrlEmbed(id) {
  const res = await fetch(`${MOVIE_TRAILER_URL}/${id}`);
  return res.text();
}

// Obtiene lista de actores famosos más populares
export async function getFamousPopular() {
  const res = await fetch(FAMOUS_POPULAR_URL);
  return res.json();
}

// Obtiene detalles del actor seleccionado
export async function getFamousDetails(id) {
  const res = await fetch(`${FAMOUS_DETAILS_URL}/${id}`);
  return res.json();
}

// Obtiene las películas del actor seleccionado
export async function getFamousMovies(id){
  const res = await fetch(`${FAMOUS_MOVIES_URL}/${id}`);
  return res.json();
}

