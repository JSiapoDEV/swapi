/* eslint-disable max-len */
import { FilmModel } from '@src/domain/model/film-model';
import { FilmRepository } from '@src/domain/repository/film-repository';
import { FilmService } from '../../src/application/film-service';

const mockFilmRepository: jest.Mocked<FilmRepository> = {
  getFilms: jest.fn(),
  createFilm: jest.fn().mockResolvedValue({} as FilmModel),
  findFilm: jest.fn(),
  updateFilm: jest.fn(),
  deleteFilm: jest.fn(),
};

const filmMocks: FilmModel[] = [
  {
    id: 1,
    titulo: 'A New Hope',
    genero: 'Action, Adventure, Fantasy, Sci-Fi',
    director: 'George Lucas',
    escritor: 'George Lucas',
    fecha: '1977-05-25',
    actores: 'Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing',
    sinopsis:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and twodroids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    idioma: 'English',
    pais: 'USA',
    premios: 'Won 6 Oscars. Another 50 wins & 28 nominations.',
    poster: 'https://m.media-amazon.com/images/I/81WjGytzv7L._AC_SY741_.jpg',
    estado: true,
  },
  {
    id: 2,
    titulo: 'The Empire Strikes Back',
    genero: 'Action, Adventure, Fantasy, Sci-Fi',
    director: 'Irvin Kershner',
    escritor: 'Leigh Brackett, Lawrence Kasdan',
    fecha: '1980-05-21',
    actores: 'Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams',
    sinopsis:
      'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.',
    idioma: 'English',
    pais: 'USA',
    premios: 'Won 1 Oscar. Another 24 wins & 20 nominations.',
    poster: 'https://m.media-amazon.com/images/I/81WjGytzv7L._AC_SY741_.jpg',
    estado: true,
  },
];

describe('FilmService', () => {
  let filmService: FilmService;

  beforeEach(() => {
    jest.clearAllMocks();
    filmService = new FilmService(mockFilmRepository);
  });

  describe('getFilms', () => {
    it('debería retornar una lista de películas', async () => {
      const mockFilms: FilmModel[] = [...filmMocks];

      mockFilmRepository.getFilms.mockResolvedValue(mockFilms);

      const films = await filmService.getFilms();

      expect(mockFilmRepository.getFilms).toHaveBeenCalledTimes(1);
      expect(films).toEqual(mockFilms);
    });

    it('debería manejar cuando no hay películas', async () => {
      mockFilmRepository.getFilms.mockResolvedValue([]);

      const films = await filmService.getFilms();

      expect(mockFilmRepository.getFilms).toHaveBeenCalledTimes(1);
      expect(films).toEqual([]);
    });

    it('debería manejar errores del repositorio', async () => {
      const error = new Error('Error al obtener películas');
      mockFilmRepository.getFilms.mockRejectedValue(error);

      await expect(filmService.getFilms()).rejects.toThrow(
        'Error al obtener películas',
      );
      expect(mockFilmRepository.getFilms).toHaveBeenCalledTimes(1);
    });
  });

  describe('createFilm', () => {
    it('debería crear una nueva película', async () => {
      const newFilm: FilmModel = { ...filmMocks[0], id: 3 };
      mockFilmRepository.createFilm.mockResolvedValue();

      const createdFilm = await filmService.createFilm(newFilm);

      expect(mockFilmRepository.createFilm).toHaveBeenCalledWith(newFilm);
      expect(createdFilm).toBeUndefined();
    });

    it('debería manejar errores al crear una película', async () => {
      const newFilm: FilmModel = { ...filmMocks[0], id: 3 };
      const error = new Error('Error al crear película');
      mockFilmRepository.createFilm.mockRejectedValue(error);

      await expect(filmService.createFilm(newFilm)).rejects.toThrow(
        'Error al crear película',
      );
      expect(mockFilmRepository.createFilm).toHaveBeenCalledWith(newFilm);
    });
  });

  describe('findFilm', () => {
    it('debería encontrar una película por ID', async () => {
      const filmId = '1';
      const mockFilm: FilmModel = { ...filmMocks[0] };

      mockFilmRepository.findFilm.mockResolvedValue(mockFilm);

      const film = await filmService.findFilm(filmId);

      expect(mockFilmRepository.findFilm).toHaveBeenCalledWith(filmId);
      expect(film).toEqual(mockFilm);
    });

    it('debería retornar null si la película no existe', async () => {
      const filmId = 'non-existent-id';
      mockFilmRepository.findFilm.mockResolvedValue(null);

      const film = await filmService.findFilm(filmId);

      expect(mockFilmRepository.findFilm).toHaveBeenCalledWith(filmId);
      expect(film).toBeNull();
    });

    it('debería manejar errores al buscar una película', async () => {
      const filmId = '1';
      const error = new Error('Error al buscar película');
      mockFilmRepository.findFilm.mockRejectedValue(error);

      await expect(filmService.findFilm(filmId)).rejects.toThrow(
        'Error al buscar película',
      );
      expect(mockFilmRepository.findFilm).toHaveBeenCalledWith(filmId);
    });
  });

  describe('updateFilm', () => {
    it('debería actualizar una película existente', async () => {
      const updatedFilm: FilmModel = { ...filmMocks[0] };
      mockFilmRepository.updateFilm.mockResolvedValue(updatedFilm);

      const result = await filmService.updateFilm(updatedFilm);

      expect(mockFilmRepository.updateFilm).toHaveBeenCalledWith(updatedFilm);
      expect(result).toEqual(updatedFilm);
    });

    it('debería manejar errores al actualizar una película', async () => {
      const updatedFilm: FilmModel = { ...filmMocks[0] };
      const error = new Error('Error al actualizar película');
      mockFilmRepository.updateFilm.mockRejectedValue(error);

      await expect(filmService.updateFilm(updatedFilm)).rejects.toThrow(
        'Error al actualizar película',
      );
      expect(mockFilmRepository.updateFilm).toHaveBeenCalledWith(updatedFilm);
    });
  });

  describe('deleteFilm', () => {
    it('debería eliminar una película por ID', async () => {
      const filmId = '1';
      mockFilmRepository.deleteFilm.mockResolvedValue();

      const result = await filmService.deleteFilm(filmId);

      expect(mockFilmRepository.deleteFilm).toHaveBeenCalledWith(filmId);
      expect(result).toBeUndefined();
    });

    it('debería manejar errores al eliminar una película', async () => {
      const filmId = '1';
      const error = new Error('Error al eliminar película');
      mockFilmRepository.deleteFilm.mockRejectedValue(error);

      await expect(filmService.deleteFilm(filmId)).rejects.toThrow(
        'Error al eliminar película',
      );
      expect(mockFilmRepository.deleteFilm).toHaveBeenCalledWith(filmId);
    });
  });
});
