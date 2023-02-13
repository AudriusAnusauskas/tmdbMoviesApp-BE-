import supertest from 'supertest';
import mongoose from 'mongoose';
import connectToMongoDB from './conncectToMongoDB';
import { UserModel } from '../../src/models/user';
import { encryptPassword } from '../../src/services/encrypt.service';

import app from '../../src/app';

describe('testing login endpoint', () => {
  beforeAll(connectToMongoDB);

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  const uniqueEmail = `audrius1112_${Date.now()}@email.com`;

  it('should return 200 and return token: value', async () => {
    const testUser = {
      name: 'Audrius',
      email: uniqueEmail,
      password: encryptPassword('Abdsdfc!12h4'),
    };

    await UserModel.create(testUser);

    const testLogin = {
      email: uniqueEmail,
      password: 'Abdsdfc!12h4',
    };

    const res = await supertest(app).post('/login').send(testLogin).expect(200);

    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 and return Wrong email or password.', async () => {
    const testUser = {
      name: 'Audrius',
      email: uniqueEmail,
      password: encryptPassword('Abdsdfc!12h4'),
    };

    await UserModel.create(testUser);

    const testLogin = {
      email: uniqueEmail,
      password: 'Pass123',
    };

    const res = await supertest(app).post('/login').send(testLogin);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Wrong email or password');
  });

  it('should return 401 and return Wrong email or password', async () => {
    const testUser = {
      name: 'Audrius',
      email: uniqueEmail,
      password: encryptPassword('Abdsdfc!12h4'),
    };

    await UserModel.create(testUser);

    const testLogin = {
      email: 'some@uniqueEmail.com',
      password: 'Abdsdfc!12h4',
    };

    const res = await supertest(app).post('/login').send(testLogin);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Wrong email or password');
  });

  it('should return 400 and an error message when email is missing', async () => {
    const res = await supertest(app).post('/login').send({ password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors.map((e: { msg: string }) => e.msg)).toContain('Email is a required field.');
  });

  it('should return 400 and an error message when password is missing', async () => {
    const res = await supertest(app).post('/login').send({ email: uniqueEmail });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors.map((e: { msg: string }) => e.msg)).toContain('Password is a required field.');
  });
});
