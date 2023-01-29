import express from 'express';
import { signUp } from '../controllers/signUp.controller';
import { validateUser } from '../validators/user.validator';

const signUpRouter = express.Router();

signUpRouter.route('/').post(validateUser, signUp);

export default signUpRouter;
