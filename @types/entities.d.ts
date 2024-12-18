type FilmSWAPI = {
  title?: string;
  episode_id?: number;
  opening_crawl?: string;
  director?: string;
  producer?: string;
  release_date?: string; //"1977-05-25"
  characters?: string[];
  planets?: string[];
  starships?: string[];
  vehicles?: string[];
  species?: string[];
  created?: string;
  edited?: string;
  url?: string;
};

// Omdb API response
type FilmOMdb = {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Rating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
};

type Rating = {
  Source?: string;
  Value?: string;
};

type FilmModel = {
  id: number;
  titulo: string;
  genero: string;
  director: string;
  escritor: string;
  fecha: string;
  actores: string;
  sinopsis: string;
  idioma: string;
  pais: string;
  premios: string;
  poster: string;
  estado: boolean; // number 0 or 1
};

type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
};
