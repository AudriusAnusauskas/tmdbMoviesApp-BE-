import { getSortOptions } from '../services/sort-option.service';

const validateSortOptions = (sort: string) => {
  const validOptions = getSortOptions();
  if (validOptions.some((e) => e.code === sort)) {
    return true;
  }
  return false;
};

export default validateSortOptions;
