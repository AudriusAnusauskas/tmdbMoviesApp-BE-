const convertMovie = (obj: TmdbMovie): Movie => {
  const output: Movie = {
    movieId: obj.id,
    title: obj.title,
    releaseDate: obj.release_date,
    backdropPath: `https://image.tmdb.org/t/p/w500${obj.backdrop_path}`,
    posterPath: `https://image.tmdb.org/t/p/w500${obj.poster_path}`,
    voteAverage: obj.vote_average,
  };
  return output;
};

export { convertMovie };
