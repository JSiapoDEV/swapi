import { ApiError, InternalServerError } from '@utils/error_handling';
/* eslint-disable max-len */
import {
  createFilm,
  deleteFilm,
  findFilm,
  getFilms,
  updateFilm,
} from '../../src/handler/film-handler';

import { Params } from '../../domain/http';
import { service } from '../../src/infraestructure/container/film-container';

jest.mock('../../src/infraestructure/container', () => ({
  service: {
    getFilms: jest.fn(),
    createFilm: jest.fn(),
    findFilm: jest.fn(),
    updateFilm: jest.fn(),
    deleteFilm: jest.fn(),
  },
}));

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

const req: Params = {
  body: {},
  query: {},
  headers: {},
  ip: '',
  host: '',
  context: {} as any,
  event: {} as any,
};

describe('Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilms', () => {
    it('debería retornar una lista de películas con status 200', async () => {
      const mockFilms = [...filmMocks];
      (service.getFilms as jest.Mock).mockResolvedValue(mockFilms);
      const response = await getFilms(req);

      expect(service.getFilms).toHaveBeenCalledTimes(1);
      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({ films: mockFilms, count: mockFilms.length }),
      });
    });

    it('debería manejar errores y retornar status 500', async () => {
      (service.getFilms as jest.Mock).mockRejectedValue(
        new InternalServerError('Error al obtener películas'),
      );
      await expect(getFilms(req)).rejects.toThrow('Error al obtener películas');
      expect(service.getFilms).toHaveBeenCalledTimes(1);
    });
  });

  describe('createFilm', () => {
    it('debería crear una película y retornar status 201', async () => {
      const newFilm = { ...filmMocks[0], id: 3 };
      (service.createFilm as jest.Mock).mockResolvedValue(undefined);

      const response = await createFilm({ ...req, body: newFilm });

      expect(service.createFilm).toHaveBeenCalledWith(newFilm);
      expect(response).toEqual({
        statusCode: 201,
        body: JSON.stringify({ message: 'Film created' }),
      });
    });

    it('debería manejar errores y retornar status 500', async () => {
      const newFilm = { title: 'Film 3', director: 'Director 3', releaseYear: 2022 };
      const error = new Error('Error al crear película');
      (service.createFilm as jest.Mock).mockRejectedValue(error);

      await expect(
        createFilm({
          ...req,
          body: newFilm,
        }),
      ).rejects.toThrow('Error al crear película');
      expect(service.createFilm).toHaveBeenCalledWith(newFilm);
    });
  });

  describe('findFilm', () => {
    it('debería encontrar una película por ID y retornar status 200', async () => {
      const filmId = '1';
      const mockFilm = {
        id: '1',
        title: 'Film 1',
        director: 'Director 1',
        releaseYear: 2020,
      };
      (service.findFilm as jest.Mock).mockResolvedValue(mockFilm);

      const response = await findFilm({ ...req, query: { id: filmId } });

      expect(service.findFilm).toHaveBeenCalledWith(filmId);
      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({ film: mockFilm }),
      });
    });

    it('debería retornar status 200 con film null si no se encuentra la película', async () => {
      const filmId = 'non-existent-id';
      (service.findFilm as jest.Mock).mockResolvedValue(null);

      const response = await findFilm({ ...req, query: { id: filmId } });

      expect(service.findFilm).toHaveBeenCalledWith(filmId);
      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({ film: null }),
      });
    });
  });

  describe('updateFilm', () => {
    it('debería actualizar una película y retornar status 200', async () => {
      const updatedFilm = {
        id: '1',
        title: 'Updated Film',
        director: 'Director 1',
        releaseYear: 2020,
      };
      (service.updateFilm as jest.Mock).mockResolvedValue(undefined);

      const response = await updateFilm({ ...req, body: updatedFilm });

      expect(service.updateFilm).toHaveBeenCalledWith(updatedFilm);
      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({ message: 'Film updated' }),
      });
    });

    it('debería manejar errores y retornar status 500', async () => {
      const updatedFilm = { ...filmMocks[0] };
      const error = new Error('Error al actualizar película');
      (service.updateFilm as jest.Mock).mockRejectedValue(error);

      await expect(updateFilm({ ...req, body: updatedFilm })).rejects.toThrow(
        'Error al actualizar película',
      );
      expect(service.updateFilm).toHaveBeenCalledWith(updatedFilm);
    });
  });

  describe('deleteFilm', () => {
    it('debería eliminar una película por ID y retornar status 200', async () => {
      const filmId = '1';
      (service.deleteFilm as jest.Mock).mockResolvedValue(true);

      const response = await deleteFilm({ ...req, query: { id: filmId } });

      expect(service.deleteFilm).toHaveBeenCalledWith(Number(filmId));
      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({ message: 'Film deleted' }),
      });
    });

    it('debería manejar errores y retornar status 500', async () => {
      const filmId = '1';
      const error = new Error('Error al eliminar película');
      (service.deleteFilm as jest.Mock).mockRejectedValue(error);

      await expect(deleteFilm({ ...req, query: { id: filmId } })).rejects.toThrow(
        'Error al eliminar película',
      );
      expect(service.deleteFilm).toHaveBeenCalledWith(Number(filmId));
    });
  });
});
