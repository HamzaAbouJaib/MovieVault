import axios from "axios";
import ApiKey from "../apiKey";

const baseEndpoint = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${baseEndpoint}/trending/movie/day?api_key=${ApiKey}`;
const upcomingMoviesEndpoint = `${baseEndpoint}/movie/upcoming?api_key=${ApiKey}`;
const topRatedMoviesEndpoint = `${baseEndpoint}/movie/top_rated?api_key=${ApiKey}`;

const movieDetailsEndpoint = (id) =>
  `${baseEndpoint}/movie/${id}?api_key=${ApiKey}`;
const movieCreditsEndpoint = (id) =>
  `${baseEndpoint}/movie/${id}/credits?api_key=${ApiKey}`;
const similarMoviesEndpoint = (id) =>
  `${baseEndpoint}/movie/${id}/recommendations?api_key=${ApiKey}`;
const personDetailsEndpoint = (id) =>
  `${baseEndpoint}/person/${id}?api_key=${ApiKey}`;
const personMoviesEndpoint = (id) =>
  `${baseEndpoint}/person/${id}/movie_credits?api_key=${ApiKey}`;
const searchMoviesEndpoint = (query) =>
  `${baseEndpoint}/search/movie?query=${query}&include_adult=true&language=en-US&page=1&api_key=${ApiKey}`;
const movieBannerImagesEndpoint = (id) =>
  `${baseEndpoint}/movie/${id}/images'?api_key=${ApiKey}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

async function apiCall(endpoint, params) {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export function fetchTrendingMovies() {
  return apiCall(trendingMoviesEndpoint);
}

export function fetchUpcomingMovies() {
  return apiCall(upcomingMoviesEndpoint);
}

export function fetchTopRatedMovies() {
  return apiCall(topRatedMoviesEndpoint);
}

export function fetchMovieDetails(id) {
  return apiCall(movieDetailsEndpoint(id));
}

export function fetchMovieCredits(id) {
  return apiCall(movieCreditsEndpoint(id));
}

export function fetchSimilarMovies(id) {
  return apiCall(similarMoviesEndpoint(id));
}

export function fetchPersonDetails(id) {
  return apiCall(personDetailsEndpoint(id));
}

export function fetchPersonMovies(id) {
  return apiCall(personMoviesEndpoint(id));
}

export function fetchSearchedMovies(query) {
  return apiCall(searchMoviesEndpoint(query));
}

export function fetchMovieBannerImages(id) {
  return apiCall(movieBannerImagesEndpoint(id));
}
