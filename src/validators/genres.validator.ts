const validateGenre = (genres: string[]) => {
  if (!Array.isArray(genres)) {
    return 'genres should be an array';
  }
  // for (const genre of genres) {
  //   if (isNaN(genre)) {
  //     return 'All genres should be integers';
  //   }
  // }
  return true;
};

export default validateGenre;
