import { getSortOptions } from '../services/sort-option.service';

const validateSortOptions = (sort: string) => {
  if (sort === undefined || sort === null || sort === '') {
    return true;
  }
  const validOptions = getSortOptions();
  if (validOptions.some((e) => e.code === sort)) {
    return true;
  }
  return false;
};

export default validateSortOptions;
