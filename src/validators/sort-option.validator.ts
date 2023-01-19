import { getSortOptions } from '../services/sort-option.service';

const validOptions = getSortOptions().map((e) => e.code);
const validateSortOptions = (sort: string) => {
  return !sort || validOptions.includes(sort);
};

export default validateSortOptions;
