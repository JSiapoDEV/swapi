import { AWS } from '@serverless/typescript';

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
  qas: createTable('SWAPIFilmTable_qas'),
  prod: createTable('SWAPIFilmTable_prod'),
};
