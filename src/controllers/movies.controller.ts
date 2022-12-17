import express from 'express';
import axios from 'axios';
import detailedMovie from '../../tempData/movie';
import { convertMovie } from '../converters/movie.converter';

const getMovies = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
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

  try {
    res.json(await getTmdbMovies());
  } catch (err) {
    next(err);
  }
};

const getMovieDetails = (req: express.Request, res: express.Response): void => {
  const id = Number(req.params.movieId);
  const mov = detailedMovie.find((movie) => movie.movieId === id);
  if (!mov) {
    res.status(404).send('Movie not found');
    return console.error('Movie not found');
  }
  res.json(mov);
};

export { getMovies, getMovieDetails };
