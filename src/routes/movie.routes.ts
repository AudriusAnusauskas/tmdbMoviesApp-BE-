import express from 'express';

import { getMovieDetails } from '../controllers/movies.controller';

const movieRouter = express.Router();

movieRouter.route('/:movieId').get(getMovieDetails);

export default movieRouter;
