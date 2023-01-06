import axios from 'axios';
import { convertMovie, convertMovieDetails } from '../converters/movie.converter';

const moviesCache: { [page: number]: Movie[] } = {};
let totalPagesCache: number | undefined;

const getTmdbMovies = async (page: number): Promise<Movies> => {
  const cacheKey = Number(page);

  if (!moviesCache[cacheKey]) {
    const { data } = await axios.get<TmdbMovies>(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY}`,
    );

    moviesCache[cacheKey] = data.results.map(convertMovie);
    totalPagesCache = data.total_pages;
  }

  return {
    page,
    movies: moviesCache[cacheKey] || [],
    totalPages: totalPagesCache || 1,
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

export { getTmdbMovies, getTmdbMovieDetails };
