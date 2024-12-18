import { FilmCacheDynamoDatasource } from '../datasource/film-cache-datasource';
import { FilmDynamoDatasource } from '../datasource/film-datasource';
import FilmOMdbService from '@src/infraestructure/service/get-film-omdb-service';
import { FilmRepository } from '@src/domain/repository/film-repository';
import FilmSwapiService from '@src/infraestructure/service/get-film-swapi-service';
import { generateFilmModel } from '@src/domain/model/film-model';

export class FilmRepositoryImp implements FilmRepository {
  constructor(
    protected readonly datasource: FilmDynamoDatasource,
    protected readonly cache: FilmCacheDynamoDatasource,
  ) {}

  async getFilms(): Promise<FilmModel[]> {
    const currentTime = Math.floor(Date.now() / 1000);
    const dbFilms = await this.datasource.getFilms();
    const cacheFilms = await this.cache.getFilms(currentTime);

    if (!cacheFilms) {
      const swapiFilms = (await FilmSwapiService()).results;

      if (!swapiFilms) return dbFilms;
      const omdbFilms = await Promise.allSettled(
        swapiFilms.map(async (film) => {
          return await FilmOMdbService({ title: film.title });
        }),
      );

      const filmMatch: {
        swapi: FilmSWAPI;
        omdb: PromiseSettledResult<FilmOMdb>;
      }[] = [];

      swapiFilms.forEach((film, index) => {
        const swapiFilm = film;
        const omdbFilm = omdbFilms[index];
        filmMatch.push({
          swapi: swapiFilm,
          omdb: omdbFilm,
        });
      });
      const films = filmMatch.map((film) =>
        generateFilmModel(
          film.swapi,
          film.omdb.status === 'fulfilled' ? film.omdb.value : null,
          true,
        ),
      );

      await this.cache.register(films, currentTime + 1800);
      return [...films, ...dbFilms];
    }

    return [...cacheFilms, ...dbFilms];
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
