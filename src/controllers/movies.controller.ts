import express from 'express';
import { getTmdbMovies, getTmdbMovieDetails } from '../services/movies.service';

const getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    const page = req.query.page as string | undefined;
    let pageNumber: number | undefined;
    if (typeof page === 'string') {
      pageNumber = parseInt(page, 10);
      if (isNaN(pageNumber)) {
        pageNumber = 1;
      }
    } else if (typeof page === 'undefined') {
      pageNumber = 1;
    }
    if (typeof pageNumber !== 'undefined' && pageNumber > 0) {
      res.json(await getTmdbMovies(pageNumber));
    } else {
      res.sendStatus(400);
    }
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
