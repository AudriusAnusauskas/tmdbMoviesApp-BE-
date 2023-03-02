import { PersonalMovieModel } from '../models/personal-movie';

const createPersonalMovie = (movie: Movie): Promise<Movie> => {
  const createdPersonalMovie = new PersonalMovieModel(movie);
  return createdPersonalMovie.save();
};

export default createPersonalMovie;
