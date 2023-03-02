import express from 'express';
import { addPersonalMovie } from '../controllers/personalMovies.controller';
import { validatePersonalMovie } from '../validators/movie.validator';
import { authenticate } from '../services/security.service';

const personalMoviesListRouter = express.Router();

personalMoviesListRouter.post('/', authenticate, validatePersonalMovie, addPersonalMovie);

export default personalMoviesListRouter;
