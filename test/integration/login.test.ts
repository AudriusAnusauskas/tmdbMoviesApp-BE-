import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';

describe('testing login endpoint', () => {
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

  it('should return 200 and return token: value', async () => {
    const testLogin = {
      email: 'audrius1@email.com',
      password: 'Abdsdfc!12h4',
    };

    const res = await supertest(app).post('/login').send(testLogin).expect(200);

    expect(res.body).toHaveProperty('token');
  });
});
