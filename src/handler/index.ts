import { Params } from '@domain/http';
import { service } from '@src/infraestructure/container';

export const getFilms = async (req: Params): Promise<any> => {
  const films = await service.getFilms();
  return {
    statusCode: 200,
    body: JSON.stringify({ films, count: films.length }),
  };
};

export const createFilm = async (req: Params): Promise<any> => {
  const film = req.body as any;
  console.log('film', film);
  await service.createFilm(film);
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Film created' }),
  };
};

export const findFilm = async (req: Params): Promise<any> => {
  const id = req.query.id;
  const film = await service.findFilm(id);
  return {
    statusCode: 200,
    body: JSON.stringify({ film }),
  };
};

export const updateFilm = async (req: Params): Promise<any> => {
  const film = req.body as any;
  await service.updateFilm(film);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Film updated' }),
  };
};

export const deleteFilm = async (req: Params): Promise<any> => {
  const id = req.query.id;
  await service.deleteFilm(+id);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Film deleted' }),
  };
};

export const getVersion = async (req: Params): Promise<any> => {
  const version = process.env.VERSION || 'unknown';
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ version }),
  };
};
