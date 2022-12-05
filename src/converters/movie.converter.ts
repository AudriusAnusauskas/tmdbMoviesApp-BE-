const prefix = 'https://image.tmdb.org/t/p/w500';

const convertMovie = (obj: TmdbMovie): Movie => {
  const output: Movie = {
    movieId: obj.id,
    title: obj.title,
    releaseDate: obj.release_date,
    backdropPath: `${prefix}${obj.backdrop_path}`,
    posterPath: `${prefix}${obj.poster_path}`,
    voteAverage: obj.vote_average,
  };
  return output;
};

export { convertMovie };
