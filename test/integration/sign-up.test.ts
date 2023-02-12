import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import connectToMongoDB from './conncectToMongoDB';
import { UserModel } from '../../src/models/user';

describe('testing-sign-up endpoint', () => {
  beforeAll(connectToMongoDB);

  afterAll(async () => {
    await UserModel.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should return 201 and created user object', async () => {
    const newUser = {
      name: 'Audrius A',
      email: 'audrius@email.com',
      password: 'Abdsdfc!12h4',
    };

    const res = await supertest(app).post('/sign-up').send(newUser).expect(201);

    expect(res.body).toHaveProperty('name', newUser.name);
    expect(res.body).toHaveProperty('email', newUser.email);
    expect(res.body).not.toHaveProperty('password');
  });
});
