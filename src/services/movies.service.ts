import axios from 'axios';
import { convertMovie, convertMovieDetails } from '../converters/movie.converter';

const performGetMoviesRequest = async (page: number, genres: number[], sort: string): Promise<Movies> => {
  const { data } = await axios.get<TmdbMovies>(
    `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&with_genres=${genres}&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY}`,
  );

  const movies = data.results.map(convertMovie);
  const totalPages = data.total_pages;

  return {
    page,
    movies: movies,
    totalPages: totalPages,
  };
};

const moviesCache: { [page: number]: Movie[] } = {};
let totalPagesCache: number | undefined;

const getMovies = async (page: number, genres: number[], sort: string): Promise<Movies> => {
  const cacheKey = Number(page);

  if (genres || sort) {
    return performGetMoviesRequest(page, genres, sort);
  }

  if (!moviesCache[cacheKey]) {
    const data = await performGetMoviesRequest(page, [], '');
    moviesCache[cacheKey] = data.movies;
    totalPagesCache = data.totalPages;
  }

  return {
    page,
    movies: moviesCache[cacheKey] ?? [],
    totalPages: totalPagesCache ?? 1,
  };
};

interface CacheMoveiDetails {
  [id: number]: MovieDetails;
}

const cacheMovieDetails: CacheMoveiDetails = {};

const getTmdbMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  if (!cacheMovieDetails[movieId]) {
    const { data } = await axios.get<TmdbMovieDetails>(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`,
    );
    cacheMovieDetails[movieId] = convertMovieDetails(data);

    return cacheMovieDetails[movieId];
  }
  return cacheMovieDetails[movieId];
};

const searchMoviesByTitle = async (
  title: string,
  page: number,
): Promise<Movies | { error: string; page?: number; results?: string[]; totalPages?: number }> => {
  try {
    const { data } = await axios.get<TmdbMovies>(
      `https://api.themoviedb.org/3/search/movie?query=${title}&page=${page}&api_key=${process.env.API_KEY}`,
    );
    const filteredMovies = data.results.map(convertMovie);
    const totalPages = data.total_pages;
    return {
      page,
      movies: filteredMovies ?? [],
      totalPages: totalPages ?? 1,
    };
  } catch (error) {
    throw new Error('Movie search failed');
  }
};

export { getMovies, getTmdbMovieDetails, searchMoviesByTitle };
