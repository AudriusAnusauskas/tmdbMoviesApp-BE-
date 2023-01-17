import validateGenres from '../src/validators/genres.validator';

describe('genresValidator', () => {
  it('should not fail if passed empty array', () => {
    expect(validateGenres([])).toBe(true);
  });

  it('array of numbers should return true', () => {
    expect(validateGenres([1, 2, 3])).toBe(true);
  });
  it(' if there is any not number (eg string/array/object/NaN/null/undefined) it should return true', () => {
    expect(validateGenres([1, 2, 'a'] as number[])).toBe(true);
  });
});
