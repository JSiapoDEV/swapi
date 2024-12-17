import { AWS } from '@serverless/typescript';

// export class FilmModel {
//     id: number;
//     titulo: string;
//     genero: string;
//     director: string;
//     escritor: string;
//     fecha: string;
//     actores: string;
//     sinopsis: string;
//     idioma: string;
//     pais: string;
//     premios: string;
//     poster: string;
//     estado: boolean;
//   }

const createTable = (tableName: string): AWS['resources']['Resources'][''] => ({
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: tableName,
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'N',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
    ],
  },
});

export const FilmTable = {
  qas: createTable('FilmTable_qas'),
  prod: createTable('FilmTable_prod'),
};
