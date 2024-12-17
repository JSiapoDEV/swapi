import { createFilm, deleteFilm, findFilm, getFilms, updateFilm } from './handler';
import { createRouter, httpEvent } from '@domain/http';

import { Context } from 'aws-lambda';

const routes = {
  'GET.all': getFilms,
  'POST.create': createFilm,
  'GET.find': findFilm,
  'PUT.update': updateFilm,
  'DELETE.delete': deleteFilm,
};

export const router = async (event: httpEvent, context: Context) =>
  await createRouter(event, context, routes);
