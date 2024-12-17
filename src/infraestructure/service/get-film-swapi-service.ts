import { StarWarsApiService } from '../api';

export default async () => {
  const swapiService = new StarWarsApiService();
  return swapiService.get<Result<FilmSWAPI>, undefined>({
    endpoint: 'films',
    params: undefined,
  });
};
