import httpStatus from 'http-status';
import supertest from 'supertest';

import app from '../../src/app';
import { options } from '../../src/controllers/options';

const expectedResponse = options;

describe('testing-sort-option', () => {
  const request = supertest(app);

  describe('GET /sort-options', () => {
    it('should return sort-options status', (done) => {
      request
        .get('/sort-options')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).toEqual(expectedResponse);
          done();
        })
        .catch(done);
    });
  });
});
