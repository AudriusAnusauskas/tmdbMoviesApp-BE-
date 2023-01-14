import axios from 'axios';

let genreCache: Genre[];

const getGenres = async (): Promise<Genres> => {
  if (!genreCache) {
    const { data } = await axios.get<Genres>(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`,
    );
    genreCache = data.genres;
  }

  return { genres: genreCache ?? [] };
};

export { getGenres };
