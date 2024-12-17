import { FilmModel } from '../model/film-model';

export interface FilmRepository {
  getFilms(): Promise<FilmModel[]>;
  createFilm(film: FilmModel): Promise<void>;
  findFilm(id: number): Promise<FilmModel>;
  updateFilm(film: FilmModel): Promise<FilmModel>;
  deleteFilm(id: number): Promise<void>;
}
