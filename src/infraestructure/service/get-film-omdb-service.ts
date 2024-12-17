import { OmdbApiService } from '../api';

// http://www.omdbapi.com/?t=Cars&y=2011
export default async ({ title }: { title: string }) => {
  const omdbService = new OmdbApiService();
  return omdbService.get<FilmOMdb, { t: string }>({
    endpoint: '',
    params: { t: title },
  });
};
