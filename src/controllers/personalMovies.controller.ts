import express from 'express';
import { validationResult } from 'express-validator';
import createPersonalMovie from '../services/personalMovies.service';

interface PersonalMovie extends Movie {
  email: string;
}

const addPersonalMovie = async (req: express.Request, res: express.Response) => {
  const movie: PersonalMovie = { ...req.body, email: req.currentUserEmail as string };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const savedMovie = await createPersonalMovie(movie);
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export { addPersonalMovie };
