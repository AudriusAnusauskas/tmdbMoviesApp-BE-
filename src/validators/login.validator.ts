import { body } from 'express-validator';

const validateLogin = [
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
];

export { validateLogin };
