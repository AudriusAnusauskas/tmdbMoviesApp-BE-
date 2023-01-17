const validateGenre = (genres: number[]) => {
  if (genres === undefined || genres === null) {
    return true;
  }
  if (!Array.isArray(genres)) {
    return 'genres should be an array';
  }
  for (const genre of genres) {
    if (isNaN(genre)) {
      throw Error('All genres should be integers');
    }
  }
  return true;
};

export default validateGenre;
