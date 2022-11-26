import express from 'express';
import movies from '../../tempData/movies';
import detailedMovie from '../../tempData/movie';

const getMovies = (_req: express.Request, res: express.Response): void => {
  res.json(movies);
};

const getMovieDetails = (req: express.Request, res: express.Response): void => {
  const id = Number(req.params.movieId);
  const mov = detailedMovie.find((movie) => movie.movieId === id);
  if (!mov) {
    res.status(404).send('Movie not found');
  }
  res.json(mov);
};

export { getMovies, getMovieDetails };
