export const generateFilmModel = (
  swapi: FilmSWAPI,
  omdb: FilmOMdb | null,
  status: boolean,
): FilmModel => {
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
