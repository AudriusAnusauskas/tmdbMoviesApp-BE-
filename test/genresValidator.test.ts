import validateGenres from '../src/validators/genres.validator';

describe('genresValidator', () => {
  it('should not fail if passed empty array', () => {
    expect(validateGenres([])).toBe(true);
  });

  it('array of numbers should return true', () => {
    expect(validateGenres([1, 2, 3])).toBe(true);
  });
});
