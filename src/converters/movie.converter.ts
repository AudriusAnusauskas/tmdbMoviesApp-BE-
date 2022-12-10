const prefix = 'https://image.tmdb.org/t/p/w500';

const convertMovie = (obj: TmdbMovie): Movie => {
  const output: Movie = {
    movieId: obj.id,
    title: obj.title,
    releaseDate: obj.release_date,
    backdropPath: `${prefix}/${obj.backdrop_path}`,
    posterPath: `${prefix}/${obj.poster_path}`,
    voteAverage: obj.vote_average,
  };
  return output;
};

const convertProductionCompany = (obj: TmdbProductionCompany): ProductionCompany => {
  const output: ProductionCompany = {
    id: obj.id,
    logoPath: obj.logo_path,
    name: obj.name,
    originCountry: obj.origin_country,
  };
  return output;
};

const convertProductionCountry = (obj: TmdbProductionCountry): ProductionCountry => {
  const output: ProductionCountry = {
    iso: obj.iso_3166_1,
    name: obj.name,
  };
  return output;
};

const convertSpokenLanguage = (obj: TmdbSpokenLanguage): SpokenLanguage => {
  const output: SpokenLanguage = {
    englishName: obj.english_name,
    iso: obj.iso_639_1,
    name: obj.name,
  };
  return output;
};

const imgPrefix = 'https://image.tmdb.org/t/p/original';

const convertMovieDetails = (obj: TmdbMovieDetails): MovieDetails => {
  const output: MovieDetails = {
    ...convertMovie(obj),
    backdropPath: `${imgPrefix}/${obj.backdrop_path}`,
    budget: obj.budget,
    genres: obj.genres,
    homepage: obj.homepage,
    originalLanguage: obj.original_language,
    originalTitle: obj.original_title,
    overview: obj.overview,
    posterPath: `${imgPrefix}/${obj.poster_path}`,
    productionCompanies: obj.production_companies.map(convertProductionCompany),
    productionCountries: obj.production_countries.map(convertProductionCountry),
    revenue: obj.revenue,
    runtime: obj.runtime,
    spokenLanguages: obj.spoken_languages.map(convertSpokenLanguage),
    status: obj.status,
    tagline: obj.tagline,
    title: obj.title,
    voteCount: obj.vote_count,
  };
  return output;
};

export { convertMovie, convertMovieDetails };
