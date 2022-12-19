import axios from 'axios';
import { convertMovie } from '../converters/movie.converter';

let moviesCache: Movie[] | undefined;
let totalPagesCache: number | undefined;

const getTmdbMovies = async (): Promise<Movies> => {
  if (!moviesCache) {
    const { data } = await axios.get<TmdbMovies>(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&vote_count.gte=1000&api_key=${process.env.API_KEY}`,
    );

    moviesCache = data.results.map(convertMovie);
    totalPagesCache = data.total_pages;
  }

  return {
    page: 1,
    movies: moviesCache || [],
    totalPages: totalPagesCache || 1,
  };
};

export { getTmdbMovies };
