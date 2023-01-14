import express from 'express';
import { getGenres } from '../services/genre.service';

const requestGenres = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    res.json(await getGenres());
  } catch (err) {
    next(err);
  }
};

export { requestGenres };
