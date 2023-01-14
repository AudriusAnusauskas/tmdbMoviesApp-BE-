import express from 'express';
import { requestGenres } from '../controllers/genre.controller';

const genreRouter = express.Router();

genreRouter.route('/genres').get(requestGenres);

export default genreRouter;
