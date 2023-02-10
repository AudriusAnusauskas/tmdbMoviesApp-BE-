import express from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { login } from '../services/login.service';

const logInControl = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await login(email as string, password as string);
    if (!user) {
      return res.status(401).json({ error: 'Wrong email or password 123' });
    }

    const getSecret = (): string => {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      if (secret === undefined) {
        throw Error;
      }
      return secret;
    };

    const token = jwt.sign({ data: email }, getSecret(), { expiresIn: String(process.env.JWT_EXPIRE) });
    console.log(token);

    return res.status(200).json({ token: 'value' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export { logInControl };
