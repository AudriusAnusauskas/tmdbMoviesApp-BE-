import express from 'express';
import { logInControl } from '../controllers/login.controller';
import { validateLogin } from '../validators/login.validator';

const loginRouter = express.Router();

loginRouter.route('/').post(validateLogin, logInControl);

export default loginRouter;
