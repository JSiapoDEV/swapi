import { FilmModel, generateFilmModel } from '@src/domain/model/film-model';

import { FilmDynamoDatasource } from '../datasource/film-datasource';
import FilmOMdbService from '@src/infraestructure/service/get-film-omdb-service';
import { FilmRepository } from '@src/domain/repository/film-repository';
import FilmSwapiService from '@src/infraestructure/service/get-film-swapi-service';

export class FilmRepositoryImp implements FilmRepository {
  constructor(protected readonly datasource: FilmDynamoDatasource) {}

  async getFilms(): Promise<FilmModel[]> {
    const dbFilms = await this.datasource.getFilms();
    console.log('dbFilms', dbFilms);
    const swapiFilms = (await FilmSwapiService()).results;

    if (!swapiFilms) return dbFilms;
    const omdbFilms = await Promise.allSettled(
      swapiFilms.map(async (film) => {
        return await FilmOMdbService({ title: film.title });
      }),
    );

    const filmMatch = [];

    swapiFilms.forEach((film, index) => {
      const swapiFilm = film;
      const omdbFilm = omdbFilms[index];
      filmMatch.push({
        swapi: swapiFilm,
        omdb: omdbFilm,
      });
    });

    const filmSuccess = filmMatch.filter((film) => film.omdb.status === 'fulfilled');

    const films = filmSuccess.map((film) =>
      generateFilmModel(film.swapi, film.omdb.value, true),
    );

    return [...films, ...dbFilms];
  }
  async createFilm(film: FilmModel): Promise<void> {
    await this.datasource.createFilm(film);
  }
  async findFilm(id: number): Promise<FilmModel> {
    return await this.datasource.getFilmById(id);
  }
  async updateFilm(film: FilmModel): Promise<FilmModel> {
    return await this.datasource.updateFilm(film);
  }
  async deleteFilm(id: number): Promise<void> {
    return await this.datasource.deleteFilm(id);
  }
}
