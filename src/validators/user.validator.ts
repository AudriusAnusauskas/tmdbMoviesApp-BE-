import { body } from 'express-validator';
import express from 'express';

import { encryptPassword } from '../services/encrypt.service';

const validateUser = [
  body('name')
    .notEmpty()
    .withMessage('Name is a required field.')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters.'),
  body('email')
    .notEmpty()
    .withMessage('Email is a required field.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('password')
    .notEmpty()
    .withMessage('Password is a required field.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.')
    .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%^&*-_+])/)
    .withMessage(
      'Password must have at least one upper case letter, one number, and one special character (!#$%^&*-_+)',
    ),
  async (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    req.body.password = encryptPassword(await req.body.password);
    next();
  },
];

export { validateUser };
