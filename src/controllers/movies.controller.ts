import express from 'express';
import * as movieService from '../services/movies.service';
import validateTitle from '../validators/title.validator';
import validateGenre from '../validators/genres.validator';
import validateSortOptions from '../validators/sort-option.validator';

const getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const title = req.query.title as string;
    const genres = (req.query.genres as string)?.split(',').map((e) => parseInt(e)) ?? [];
    const sort = req.query.sort as string;

    if (!validateTitle(title)) {
      return res.status(400).json({ error: 'invalid title' }).end();
    }

    if (!validateGenre(genres)) {
      return res.status(400).json({ error: 'invalid genres' }).end();
    }

    if (!validateSortOptions(sort)) {
      return res.status(400).json({ error: 'invalid sort option' }).end();
    }

    res.json(
      title
        ? await movieService.searchMoviesByTitle(title as string, page as number)
        : await movieService.getMovies(page, genres, sort),
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
