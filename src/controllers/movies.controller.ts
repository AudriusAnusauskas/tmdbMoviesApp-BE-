import express from 'express';
import { getTmdbMovies } from '../services/movies.service';
import detailedMovie from '../../tempData/movie';

const getMovies = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
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
