import express from 'express';
import * as movieService from '../services/movies.service';
import validateTitle from '../validators/title.validator';
import validateGenre from '../validators/genres.validator';

const getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const title = req.query.title as string;
    const genres = req.query.genres as [];
    genres.toString().split(',');

    if (!validateTitle(title)) {
      return res.status(400).json({ error: 'invalid title' }).end();
    }

    if (!validateGenre(genres)) {
      return res.status(400).json({ error: 'invalid genres' }).end();
    }

    res.json(
      title
        ? await movieService.searchMoviesByTitle(title as string, page as number)
        : await movieService.getMovies(page, genres),
    );
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
    res.json(await movieService.getTmdbMovieDetails(parseInt(req.params.movieId)));
  } catch (err) {
    next(err);
  }
};

export { getMovies, getMovieDetails };
