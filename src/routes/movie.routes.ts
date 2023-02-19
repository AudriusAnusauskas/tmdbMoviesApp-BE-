import express from 'express';
import { authenticate } from '../services/security.service';

import { getMovieDetails } from '../controllers/movies.controller';

const movieRouter = express.Router();

movieRouter.route('/:movieId').get(authenticate, getMovieDetails);

export default movieRouter;
