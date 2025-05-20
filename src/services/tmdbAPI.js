import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTUyNjQ4ZWM5MmUyNzkwMGFjMDUxNGI3OGJhZDcxYiIsIm5iZiI6MTc0NzY4MDM3OC42MzYsInN1YiI6IjY4MmI3YzdhNGI0MDQxNzQzNDJmNzc4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dbGOelu0bHmjbuS8o0p5dMiDhsvjtlyTkgJ_gWo0BtE'; // встав сюди свій токен

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: ACCESS_TOKEN,
  },
});

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async query => {
  const response = await axiosInstance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async movieId => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async movieId => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async movieId => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};