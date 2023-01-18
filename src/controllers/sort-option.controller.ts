import express from 'express';

import * as sortOptionService from '../services/sort-option.service';

const getSortOptions = (_req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    res.json(sortOptionService.getSortOptions());
  } catch (err) {
    next(err);
  }
};

export default getSortOptions;
