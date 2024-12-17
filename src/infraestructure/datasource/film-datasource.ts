import { FilmModel } from '@src/domain/model/film-model';
import { api } from '@src/config';
import { dynamoDb } from '@domain/dynamodb';

export class FilmDynamoDatasource {
  async createFilm(film: FilmModel): Promise<void> {
    console.log('createFilm', film);
    const params = {
      TableName: api.DYNAMO_TABLE_FILM,
      Item: {
        ...film,
        estado: film.estado ? 1 : 0,
      },
    };

    await dynamoDb.put(params).promise();
  }

  async getFilms(): Promise<FilmModel[]> {
    const params = {
      TableName: api.DYNAMO_TABLE_FILM,
      FilterExpression: '#estado = :estado',
      ExpressionAttributeNames: {
        '#estado': 'estado',
      },
      ExpressionAttributeValues: {
        ':estado': 1,
      },
    };

    const { Items } = await dynamoDb.scan(params).promise();
    return Items as FilmModel[];
  }

  async getFilmById(id: number): Promise<FilmModel> {
    const params = {
      TableName: api.DYNAMO_TABLE_FILM,
      Key: {
        id,
      },
    };

    const { Item } = await dynamoDb.get(params).promise();
    return Item as FilmModel;
  }

  async updateFilm(film: FilmModel): Promise<FilmModel> {
    const params = {
      TableName: api.DYNAMO_TABLE_FILM,
      Key: {
        id: film.id,
      },
      UpdateExpression:
        // eslint-disable-next-line max-len
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
    };

    const { Attributes } = await dynamoDb.update(params).promise();
    return Attributes as FilmModel;
  }

  async deleteFilm(id: number): Promise<void> {
    const params = {
      TableName: api.DYNAMO_TABLE_FILM,
      Key: {
        id,
      },
      UpdateExpression: 'set estado = :estado',
      ExpressionAttributeValues: {
        ':estado': 0,
      },
    };

    await dynamoDb.update(params).promise();
  }
}
