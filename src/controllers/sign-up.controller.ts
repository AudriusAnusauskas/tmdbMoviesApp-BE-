import express from 'express';
import { validationResult } from 'express-validator';

import { createUser } from '../services/sign-up.service';

const signUp = async (req: express.Request, res: express.Response) => {
  const newUser: User = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const createdUser = await createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export { signUp };
