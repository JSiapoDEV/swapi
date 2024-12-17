import * as AWS from 'aws-sdk';

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env;

export const dynamoDb = new AWS.DynamoDB.DocumentClient({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});
