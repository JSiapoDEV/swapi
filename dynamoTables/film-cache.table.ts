import { AWS } from '@serverless/typescript';

const createTable = (tableName: string): AWS['resources']['Resources'][''] => ({
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: tableName,
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'expiresIn',
        AttributeType: 'N',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'expiresIn',
        KeyType: 'HASH',
      },
    ],
  },
});

export const FilmCacheTable = {
  qas: createTable('SWAPIFilmCacheTable_qas'),
  prod: createTable('SWAPIFilmCacheTable_prod'),
};
