import { body } from 'express-validator';

const validatePersonalMovie = [
  body('movieId').notEmpty().withMessage('movieId is required').isNumeric().withMessage('movieId must be a number'),
  body('title').notEmpty().withMessage('Movie title is required'),
  body('releaseDate').notEmpty().withMessage('releaseDate is required').isDate(),
];

export { validatePersonalMovie };
