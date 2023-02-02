import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';

describe('testing-sign-up endpoint', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connectionOptions: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(mongoUri, connectionOptions);

    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log('MongoDB connected successfully');
    });
  });

  afterAll(async () => {
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
