import 'reflect-metadata';

import type { AWS } from '@serverless/typescript';
import FilmModule from 'src/index';
import { FilmTable } from 'dynamoTables/film.table';

(() => {
  const nodeVersion = process.versions.node.split('.')[0];
  console.log('Node.js version:', nodeVersion);
  if (Number(nodeVersion) < 16) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      `
      ┌─────────────────────────────────────────────────────────────────────────────────┐
      │ La versión de Node.js que estás usando es menor a la versión recomendada.(16.x) │
      └─────────────────────────────────────────────────────────────────────────────────┘
      `,
    );
    process.exit(0);
  }
})();

const serverlessConfiguration: AWS = {
  service: 'swapi',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    profile: 'project',
    httpApi: {
      cors: {
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      },
    },
    environment: {
      SWAPI_URL: 'https://swapi.py4e.com/api',
      OMDB_URL: 'http://www.omdbapi.com',
      OMDB_API_KEY: '',
      DYNAMO_TABLE_FILM: 'FilmTable_qas',
      ACCESS_KEY_ID: '',
      SECRET_ACCESS_KEY: '',
    },
    iam: {
      role: '',
    },
    timeout: 30,
    memorySize: 256,
  },
  // import the function via paths
  functions: {
    film: FilmModule.api,
  },
  package: { individually: true },
  custom: {
    ['serverless-offline']: {
      noPrependStageInUrl: true,
      noAuth: true,
      host: '0.0.0.0',
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'esNext',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  resources: {
    Resources: {
      // UserTable: UserTable.qas,
      FilmTable: FilmTable.qas,
    },
  },
};

module.exports = serverlessConfiguration;
