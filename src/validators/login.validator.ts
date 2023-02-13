import { body } from 'express-validator';

const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is a required field.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('password').notEmpty().withMessage('Password is a required field.'),
];

export { validateLogin };
