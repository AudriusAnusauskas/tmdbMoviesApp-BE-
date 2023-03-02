import express from 'express';
import { addPersonalMovie } from '../controllers/personalMovies.controller';
// import { authenticate } from '../services/security.service';

const personalMoviesListRouter = express.Router();

personalMoviesListRouter.post('/', addPersonalMovie);

export default personalMoviesListRouter;
