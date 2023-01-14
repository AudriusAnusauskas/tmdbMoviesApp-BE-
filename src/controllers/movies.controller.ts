import express from 'express';
import { getTmdbMovies, getTmdbMovieDetails, searchMoviesByTitle } from '../services/movies.service';
import validate from '../validators/title.validator';

const getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const title = req.query.title as string;

    if (!validate(title)) {
      return res.status(400).json({ error: 'invalid title' }).end();
    }

    res.json(title ? await searchMoviesByTitle(title as string, page as number) : await getTmdbMovies(page));
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
