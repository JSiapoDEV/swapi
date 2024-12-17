import { FilmModel } from '@src/domain/model/film-model';
import { FilmRepository } from '@src/domain/repository/film-repository';

export class FilmService {
  constructor(protected readonly repository: FilmRepository) {}

  async getFilms() {
    return await this.repository.getFilms();
  }

  async createFilm(film: FilmModel) {
    return await this.repository.createFilm(film);
  }

  async findFilm(id) {
    return await this.repository.findFilm(id);
  }

  async updateFilm(film: FilmModel) {
    return await this.repository.updateFilm(film);
  }

  async deleteFilm(id) {
    return await this.repository.deleteFilm(id);
  }
}
