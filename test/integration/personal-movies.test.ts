import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import connectToMongoDB from './conncectToMongoDB';
import { PersonalMovieModel } from '../../src/models/personal-movie';
import { UserModel } from '../../src/models/user';
import { encryptPassword } from '../../src/services/encrypt.service';

const uniqueEmail = `audrius1121214${Date.now()}@email.com`;

describe('testing-personal-movies endpoint', () => {
  let authToken: string;

  beforeAll(async () => {
    await connectToMongoDB();

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

    authToken = res.body.token;
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
    await PersonalMovieModel.deleteMany({});
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should return 201 and created personal movie object', async () => {
    const newPersonalMovie = {
      movieId: 236,
      title: 'Police Academy',
      releaseDate: '1984-03-22',
    };

    const res = await supertest(app)
      .post('/personal-movies')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newPersonalMovie)
      .expect(201);

    expect(res.body).toHaveProperty('title', newPersonalMovie.title);
    expect(res.body).toHaveProperty('releaseDate', newPersonalMovie.releaseDate);
    expect(res.body).toHaveProperty('movieId', newPersonalMovie.movieId);
  });
});
