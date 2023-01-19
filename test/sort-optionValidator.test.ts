import validateSortOptions from '../src/validators/sort-option.validator';

describe('sort-options validator', () => {
  it('should return true if passed option is in the list of options returned by sort-option.service', () => {
    expect(validateSortOptions('vote_average.desc')).toBe(true);
  });
  it('should return true if passed empty string', () => {
    expect(validateSortOptions('')).toBe(true);
  });
  it('should return false if passed any other value', () => {
    expect(validateSortOptions('some value')).toBe(false);
  });
});
