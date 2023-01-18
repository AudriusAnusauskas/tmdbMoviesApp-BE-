import express from 'express';
import getOptionList from '../controllers/sort-option.controller';

const optionListRouter = express.Router();

optionListRouter.route('/').get(getOptionList);

export default optionListRouter;
