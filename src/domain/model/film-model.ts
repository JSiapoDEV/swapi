export class FilmModel {
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
}

export const generateFilmModel = (
  swapi: FilmSWAPI,
  omdb: FilmOMdb | undefined,
  status: boolean,
) => {
  return {
    id: +swapi.url.split('/').slice(-2)[0],
    titulo: swapi.title,
    genero: omdb.Genre || '',
    director: swapi.director,
    escritor: omdb.Writer || '',
    fecha: swapi.release_date,
    actores: omdb.Actors || '',
    sinopsis: omdb.Plot || '',
    idioma: omdb.Language || '',
    pais: omdb.Country || '',
    premios: omdb.Awards || '',
    poster: omdb.Poster || '',
    estado: status,
  };
};
