import validateGenres from '../src/validators/genres.validator';

test('validates genres if is a array of numbers', () => {
  expect(validateGenres([])).toBe(true);
});

test('validates genres if is a array of numbers', () => {
  expect(validateGenres(['1', '2'])).toBe(true);
});
