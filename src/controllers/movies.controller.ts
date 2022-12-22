import express from 'express';
import { getTmdbMovies, getTmdbMovieDetails } from '../services/movies.service';

const getMovies = async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    res.json(await getTmdbMovies());
  } catch (err) {
    next(err);
  }
};

const getMovieDetails = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    res.json(await getTmdbMovieDetails(parseInt(req.params.movieId)));
  } catch (err) {
    next(err);
  }
};

export { getMovies, getMovieDetails };
