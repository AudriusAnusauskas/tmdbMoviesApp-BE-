import supertest from 'supertest';

// import app from '../../src/app';
import { signUp } from '../../src/controllers/sign-up.controller';

describe('testing-sign-up endpoint', () => {
  it('should return 201 and created user object', async () => {
    const newUser = {
      name: 'Audrius A',
      email: 'audrius@email.com',
      password: 'Abdsdfc!12h4',
    };

    const res = await supertest(signUp).post('/sign-up').send(newUser).expect(201);

    expect(res.body).toHaveProperty('name', newUser.name);
    expect(res.body).toHaveProperty('email', newUser.email);
    expect(res.body).toHaveProperty('password');
  });
});
