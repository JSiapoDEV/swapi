/* eslint-disable max-len */

import { FilmDynamoDatasource } from '@src/infraestructure/datasource/film-datasource';
import { dynamoDb } from '@domain/dynamodb';

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

jest.mock('@domain/dynamodb', () => ({
  dynamoDb: {
    put: jest.fn(),
    scan: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('@src/config', () => ({
  api: {
    DYNAMO_TABLE_FILM: 'FilmsTable',
  },
}));

describe('FilmDynamoDatasource', () => {
  let datasource: FilmDynamoDatasource;

  beforeEach(() => {
    datasource = new FilmDynamoDatasource();
    jest.clearAllMocks();
  });

  describe('createFilm', () => {
    it('debería crear una película correctamente', async () => {
      const film: FilmModel = { ...filmMocks[0] };

      (dynamoDb.put as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      await datasource.createFilm(film);

      expect(dynamoDb.put).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        Item: {
          ...film,
          estado: 1,
        },
      });
    });

    it('debería manejar errores al crear una película', async () => {
      const film: FilmModel = { ...filmMocks[0] };

      (dynamoDb.put as jest.Mock).mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error('Error al crear película')),
      });

      await expect(datasource.createFilm(film)).rejects.toThrow(
        'Error al crear película',
      );

      expect(dynamoDb.put).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        Item: {
          ...film,
          estado: 1,
        },
      });
    });
  });

  describe('getFilms', () => {
    it('debería retornar una lista de películas', async () => {
      const mockFilms: FilmModel[] = [...filmMocks];

      (dynamoDb.scan as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: mockFilms }),
      });

      const films = await datasource.getFilms();

      expect(dynamoDb.scan).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        FilterExpression: '#estado = :estado',
        ExpressionAttributeNames: {
          '#estado': 'estado',
        },
        ExpressionAttributeValues: {
          ':estado': 1,
        },
      });

      expect(films).toEqual(mockFilms);
    });

    it('debería manejar errores al obtener películas', async () => {
      (dynamoDb.scan as jest.Mock).mockReturnValue({
        promise: jest
          .fn()
          .mockRejectedValue(new Error('Error al obtener películas')),
      });

      await expect(datasource.getFilms()).rejects.toThrow(
        'Error al obtener películas',
      );

      expect(dynamoDb.scan).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        FilterExpression: '#estado = :estado',
        ExpressionAttributeNames: {
          '#estado': 'estado',
        },
        ExpressionAttributeValues: {
          ':estado': 1,
        },
      });
    });
  });

  describe('getFilmById', () => {
    it('debería retornar una película por ID', async () => {
      const filmId = 1;
      const mockFilm: FilmModel = { ...filmMocks[0] };

      (dynamoDb.get as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Item: mockFilm }),
      });

      const film = await datasource.getFilmById(filmId);

      expect(dynamoDb.get).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        Key: { id: filmId },
      });

      expect(film).toEqual(mockFilm);
    });

    it('debería manejar errores al obtener una película por ID', async () => {
      const filmId = 1;
      (dynamoDb.get as jest.Mock).mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error('Error al obtener película')),
      });

      await expect(datasource.getFilmById(filmId)).rejects.toThrow(
        'Error al obtener película',
      );

      expect(dynamoDb.get).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        Key: { id: filmId },
      });
    });
  });

  describe('updateFilm', () => {
    it('debería actualizar una película correctamente', async () => {
      const film: FilmModel = { ...filmMocks[0] };

      const mockUpdatedFilm: FilmModel = { ...film };
      (dynamoDb.update as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Attributes: mockUpdatedFilm }),
      });

      const updatedFilm = await datasource.updateFilm(film);

      expect(dynamoDb.update).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        Key: { id: film.id },
        UpdateExpression:
          'set titulo = :titulo, genero = :genero, director = :director, escritor = :escritor, fecha = :fecha, actores = :actores, sinopsis = :sinopsis, idioma = :idioma, pais = :pais, premios = :premios, poster = :poster, estado = :estado',
        ExpressionAttributeValues: {
          ':titulo': film.titulo,
          ':genero': film.genero,
          ':director': film.director,
          ':escritor': film.escritor,
          ':fecha': film.fecha,
          ':actores': film.actores,
          ':sinopsis': film.sinopsis,
          ':idioma': film.idioma,
          ':pais': film.pais,
          ':premios': film.premios,
          ':poster': film.poster,
          ':estado': film.estado,
        },
        ReturnValues: 'ALL_NEW',
      });

      expect(updatedFilm).toEqual(mockUpdatedFilm);
    });

    it('debería manejar errores al actualizar una película', async () => {
      const film: FilmModel = { ...filmMocks[0] };

      (dynamoDb.update as jest.Mock).mockReturnValue({
        promise: jest
          .fn()
          .mockRejectedValue(new Error('Error al actualizar película')),
      });

      await expect(datasource.updateFilm(film)).rejects.toThrow(
        'Error al actualizar película',
      );

      expect(dynamoDb.update).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        Key: { id: film.id },
        UpdateExpression:
          'set titulo = :titulo, genero = :genero, director = :director, escritor = :escritor, fecha = :fecha, actores = :actores, sinopsis = :sinopsis, idioma = :idioma, pais = :pais, premios = :premios, poster = :poster, estado = :estado',
        ExpressionAttributeValues: {
          ':titulo': film.titulo,
          ':genero': film.genero,
          ':director': film.director,
          ':escritor': film.escritor,
          ':fecha': film.fecha,
          ':actores': film.actores,
          ':sinopsis': film.sinopsis,
          ':idioma': film.idioma,
          ':pais': film.pais,
          ':premios': film.premios,
          ':poster': film.poster,
          ':estado': film.estado,
        },
        ReturnValues: 'ALL_NEW',
      });
    });
  });

  describe('deleteFilm', () => {
    it('debería eliminar una película correctamente', async () => {
      const filmId = 1;

      (dynamoDb.update as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      await datasource.deleteFilm(filmId);

      expect(dynamoDb.update).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        Key: { id: filmId },
        UpdateExpression: 'set estado = :estado',
        ExpressionAttributeValues: {
          ':estado': 0,
        },
      });
    });

    it('debería manejar errores al eliminar una película', async () => {
      const filmId = 1;

      (dynamoDb.update as jest.Mock).mockReturnValue({
        promise: jest
          .fn()
          .mockRejectedValue(new Error('Error al eliminar película')),
      });

      await expect(datasource.deleteFilm(filmId)).rejects.toThrow(
        'Error al eliminar película',
      );

      expect(dynamoDb.update).toHaveBeenCalledWith({
        TableName: 'FilmsTable',
        Key: { id: filmId },
        UpdateExpression: 'set estado = :estado',
        ExpressionAttributeValues: {
          ':estado': 0,
        },
      });
    });
  });
});
