import express from 'express';

import * as sortOptionService from '../services/sort-option.service';
import { options } from './options';

const getSortOptions = (_req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    res.json(sortOptionService.getSortOptions(options as []));
  } catch (err) {
    next(err);
  }
};

export default getSortOptions;
