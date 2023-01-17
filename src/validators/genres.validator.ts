const validateGenre = (genres: number[]) => {
  if (genres === undefined || genres === null) {
    return true;
  }
  if (!Array.isArray(genres)) {
    return 'genres should be an array';
  }
  for (const genre of genres) {
    if (isNaN(genre)) {
      return true;
    }
  }
  return true;
};

export default validateGenre;
