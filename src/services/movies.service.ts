import axios from 'axios';
import { convertMovie } from '../converters/movie.converter';

const getTmdbMovies = async (): Promise<Movies> => {
  const { data } = await axios.get<TmdbMovies>(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&vote_count.gte=1000&api_key=${process.env.API_KEY}`,
  );
  const movies: Movie[] = data.results.map(convertMovie);

  return {
    page: 1,
    movies,
    totalPages: data.total_pages,
  };
};

export { getTmdbMovies };
