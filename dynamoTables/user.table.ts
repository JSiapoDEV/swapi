import { AWS } from '@serverless/typescript';

const createTable = (tableName: string): AWS['resources']['Resources'][''] => ({
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: tableName,
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'usuario',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'usuario',
        KeyType: 'HASH',
      },
    ],
  },
});

export const UserTable = {
  qas: createTable('Usuario_qas'),
  prod: createTable('Usuario_prod'),
};
