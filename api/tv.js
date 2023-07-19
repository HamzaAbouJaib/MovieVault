import axios from "axios";
import ApiKey from "../apiKey";

const baseEndpoint = "https://api.themoviedb.org/3";
const trendingTVsEndpoint = `${baseEndpoint}/trending/tv/day?api_key=${ApiKey}`;
const topRatedTVsEndpoint = `${baseEndpoint}/tv/top_rated?api_key=${ApiKey}`;
const airingTodayTVsEndpoint = `${baseEndpoint}/tv/airing_today?api_key=${ApiKey}`;
const TVGenresEndpoint = `${baseEndpoint}/genre/tv/list?api_key=${ApiKey}`;

const tvDetailsEndpoint = (id) => `${baseEndpoint}/tv/${id}?api_key=${ApiKey}`;
const tvCreditsEndpoint = (id) =>
  `${baseEndpoint}/tv/${id}/credits?api_key=${ApiKey}`;
const similarTVsEndpoint = (id) =>
  `${baseEndpoint}/tv/${id}/recommendations?api_key=${ApiKey}`;
const personDetailsEndpoint = (id) =>
  `${baseEndpoint}/person/${id}?api_key=${ApiKey}`;
const personTVsEndpoint = (id) =>
  `${baseEndpoint}/person/${id}/tv_credits?api_key=${ApiKey}`;
const searchTVsEndpoint = (query) =>
  `${baseEndpoint}/search/tv?query=${query}&include_adult=true&language=en-US&page=1&api_key=${ApiKey}`;
const tvBannerImagesEndpoint = (id) =>
  `${baseEndpoint}/tv/${id}/images'?api_key=${ApiKey}`;
const filteredTVsEndpoint = (genres = "", year = "") =>
  `${baseEndpoint}/discover/tv?first_air_date_year=${year}&with_genres=${genres}&api_key=${ApiKey}`;

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

export function fetchTrendingTVs() {
  return apiCall(trendingTVsEndpoint);
}

export function fetchTopRatedTVs() {
  return apiCall(topRatedTVsEndpoint);
}

export function fetchAiringTodayTVs() {
  return apiCall(airingTodayTVsEndpoint);
}

export function fetchTVGenres() {
  return apiCall(TVGenresEndpoint);
}

export function fetchTVDetails(id) {
  return apiCall(tvDetailsEndpoint(id));
}

export function fetchTVCredits(id) {
  return apiCall(tvCreditsEndpoint(id));
}

export function fetchSimilarTVs(id) {
  return apiCall(similarTVsEndpoint(id));
}

export function fetchPersonDetails(id) {
  return apiCall(personDetailsEndpoint(id));
}

export function fetchPersonTVs(id) {
  return apiCall(personTVsEndpoint(id));
}

export function fetchSearchedTVs(query) {
  return apiCall(searchTVsEndpoint(query));
}

export function fetchTVBannerImages(id) {
  return apiCall(tvBannerImagesEndpoint(id));
}

export function fetchFilteredTVs(genres, year) {
  return apiCall(filteredTVsEndpoint(genres, year));
}
