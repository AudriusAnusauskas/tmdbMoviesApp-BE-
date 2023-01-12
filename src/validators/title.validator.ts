const validate = (title: string): boolean => {
  const validTitle = /[a-zA_Z0-9 .-]+/;
  return validTitle.test(title);
};

export default validate;
