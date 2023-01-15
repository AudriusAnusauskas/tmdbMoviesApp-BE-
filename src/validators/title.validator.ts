const validateTitle = (title: string): boolean => {
  const validTitle = /^[a-zA-Z0-9-. ]+$/;
  return validTitle.test(title);
};

export default validateTitle;
