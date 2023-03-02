import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const PersonalMovieSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  email: {
    type: String,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  backdropPath: {
    type: String,
  },
  posterPath: {
    type: String,
  },
  voteAverage: {
    type: Number,
  },
}).plugin(mongoosePaginate);

export const PersonalMovieModel = mongoose.model<Movie>('personal-movie', PersonalMovieSchema);
