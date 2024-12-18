import {
  createFilm,
  deleteFilm,
  findFilm,
  getFilms,
  getVersion,
  updateFilm,
} from './handler';
import { createRouter, httpEvent } from '@domain/http';

import { Context } from 'aws-lambda';

const routes = {
  'GET.films': getFilms,
  'POST.films': createFilm,
  'GET.films/find': findFilm,
  'PUT.films': updateFilm,
  'DELETE.films': deleteFilm,
  'GET.version': getVersion,
};

export const router = async (event: httpEvent, context: Context) =>
  await createRouter(event, context, routes);
