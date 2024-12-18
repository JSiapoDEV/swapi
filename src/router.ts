import {
  createFilm,
  deleteFilm,
  findFilm,
  getFilms,
  getVersion,
  updateFilm,
} from './handler/film-handler';
import { createRouter, httpEvent } from '@domain/http';
import { getUsers, login, refreshToken, registerUser } from './handler/user-handler';

import { Context } from 'aws-lambda';

const filmRoutes = {
  'GET.films': getFilms,
  'POST.film': createFilm,
  'GET.film/find': findFilm,
  'PUT.film': updateFilm,
  'DELETE.film': deleteFilm,
};

const userRoutes = {
  'GET.user': getUsers,
  'POST.user/register': registerUser,
  'POST.user/login': login,
  'POST.user/refresh': refreshToken,
};

const routes = {
  ...filmRoutes,
  ...userRoutes,
  'GET.version': getVersion,
};

export const router = async (event: httpEvent, context: Context) =>
  await createRouter(event, context, routes);
