import { api } from '@src/config';
import { chunkArray } from '@utils/generic';
import { dynamoDb } from '@domain/dynamodb';

interface FilmCacheDatasource {
  register(films: FilmModel[], expiresIn: number): Promise<void>;
  getFilms(time: number): Promise<FilmModel[] | undefined>;
  deleteExpired(time: number): Promise<void>;
}

export class FilmCacheDynamoDatasource implements FilmCacheDatasource {
  async register(films: FilmModel[], expiresIn: number): Promise<void> {
    const params = {
      TableName: api.DYNAMO_TABLE_FILM_CACHE,
      Item: {
        films,
        expiresIn,
      },
    };
    await dynamoDb.put(params).promise();
  }
  async getFilms(expiresIn: number): Promise<FilmModel[] | undefined> {
    const params = {
      TableName: api.DYNAMO_TABLE_FILM_CACHE,
      FilterExpression: '#expiresIn > :expiresIn',
      ExpressionAttributeNames: {
        '#expiresIn': 'expiresIn',
      },
      ExpressionAttributeValues: {
        ':expiresIn': expiresIn,
      },
    };

    const { Items } = await dynamoDb.scan(params).promise();
    if (Items.length === 0) return undefined;
    const result = Items[Items.length - 1] as {
      films: FilmModel[];
      expiresIn: number;
    };
    return result.films;
  }

  async deleteExpired(expiresIn: number): Promise<void> {
    // borra las películas que ya expiraron
    const params = {
      TableName: api.DYNAMO_TABLE_FILM_CACHE,
      FilterExpression: '#expiresIn < :expiresIn',
      ExpressionAttributeNames: {
        '#expiresIn': 'expiresIn',
      },
      ExpressionAttributeValues: {
        ':expiresIn': expiresIn,
      },
    };

    const { Items } = await dynamoDb.scan(params).promise();
    if (Items.length === 0) return;
    const expiredFilms = Items as FilmModel[];

    const batchSize = 25;
    const chunkedBatch = chunkArray(expiredFilms, batchSize);
    for (const batchList of chunkedBatch) {
      //   const params = {
      //     RequestItems: {
      //       [api.DYNAMO_TABLE_FILM_CACHE]: batchList.map((film) => ({
      //         DeleteRequest: {
      //           Key: {
      //             expiresIn: film.id,
      //           },
      //         },
      //       })),
      //     },
      //   };
    }
  }
}
