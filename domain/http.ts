/* eslint-disable @typescript-eslint/no-explicit-any */

import { APIGatewayEvent, Context } from 'aws-lambda';
import {
  ApiError,
  BadRequestError,
  ConflictError,
  ConnectionError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  RequestBDError,
  UnauthorizedError,
  ValidatorError,
} from '@utils/error_handling';

process.env.TZ = 'America/Lima';

export type httpEvent = {
  headers: any;
  body: any;
  pathParameters: any;
  requestContext: any;
} & APIGatewayEvent;

export type Params = {
  body: Record<string, any>;
  query: Record<string, any>;
  headers: Record<string, any>;
  ip: string;
  host: string;
  context: Context;
  event: httpEvent;
};

export class ParamsBase implements Params {
  body: Record<string, any>;
  query: Record<string, any>;
  headers: Record<string, any>;
  ip: string;
  host: string;
  context: Context;
  event: httpEvent;
  constructor(params: Params) {
    this.body = params.body;
    this.query = params.query;
    this.headers = params.headers;
    this.ip = params.ip;
    this.host = params.host;
    this.context = params.context;
    this.event = params.event;
  }
}

export type Response = (status: number, body: any) => any;

const ignore = ['POST.login', 'GET.version'].map((e) => e.toLowerCase());

export async function createRouter(
  e: httpEvent,
  c: Context,
  routes: Record<string, any>,
): Promise<any> {
  try {
    const headers = e.headers;
    headers.host = headers.host || headers.Host;
    headers.Host = headers.host || headers.Host;
    const host = headers.host || headers.Host;

    let body: any = {};
    try {
      body = JSON.parse(e.body || '{}');
    } catch (error) {
      body = e.body;
    }

    const { proceso, metodo } = e.pathParameters || {};

    const query = e.queryStringParameters || {};
    const method = e.requestContext?.http?.method || e.httpMethod;

    const mapRoutesKeys = new Map(
      Object.keys(routes).map((key) => [key.toLowerCase(), key]),
    );

    const urlKey = `${method}.${proceso}${metodo ? `/${metodo}` : ''}`;

    const routeKey = mapRoutesKeys.get(urlKey.toLowerCase());
    if (!routeKey) {
      throw new InternalServerError(
        `No se ha encontrado una función para la ruta ${urlKey.replace('.', ':')}`,
      );
    }
    const route = routes[routeKey];

    if (!route)
      throw new InternalServerError(
        `No se ha encontrado una función para la ruta ${urlKey.replace('.', ':')}`,
      );

    return await route({
      body,
      query,
      headers,
      event: e,
      context: c,
      ip: e.requestContext?.http?.sourceIp,
      host,
    } as Params);
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof ValidatorError ||
      error instanceof RequestBDError
    )
      return ApiError(400, error.message);
    if (error instanceof NotFoundError) return ApiError(404, error.message);
    if (error instanceof UnauthorizedError) return ApiError(401, error.message);
    if (error instanceof ConflictError) return ApiError(409, error.message);
    if (
      error instanceof ConnectionError ||
      error instanceof InternalServerError ||
      error instanceof ForbiddenError
    ) {
      return ApiError(500, error.message);
    }
    if (error instanceof Error) {
      return ApiError(500, new InternalServerError(error.message).message);
    }
    return ApiError(500, new InternalServerError('Unknown error').message);
  }
}
