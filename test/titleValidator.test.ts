import validateTitle from '../src/validators/title.validator';

test('validates titele if it contais letters, numbers, dots and dashes', () => {
  expect(validateTitle('Harry Poter')).toBe(true);
});

test('validates titele if it contais letters, numbers, dots and dashes', () => {
  expect(validateTitle('Harry Poter 1')).toBe(true);
});

test('validates titele if it contais letters, numbers, dots and dashes', () => {
  expect(validateTitle('Harry-Poter')).toBe(true);
});

test('validates titele if it contais letters, numbers, dots and dashes', () => {
  expect(validateTitle('Harry.Poter')).toBe(true);
});
test('validates titele if it contais letters, numbers, dots and dashes', () => {
  expect(validateTitle('@Harry.Poter')).toBe(false);
});
test('validates titele if it contais letters, numbers, dots and dashes', () => {
  expect(validateTitle('Harry&Poter')).toBe(false);
});
