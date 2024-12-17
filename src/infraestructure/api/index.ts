import { api } from '@src/config';
import axios from 'axios';

interface ApiService {
  get<T, P>(args: {
    endpoint: string;
    params: P | undefined;
    apiKey?: string;
  }): Promise<T>;
}

abstract class BaseApiService implements ApiService {
  constructor(
    protected readonly baseUrl: string,
    protected apiKey?: string,
  ) {}
  async get<T, P>({
    endpoint,
    params,
  }: {
    endpoint: string;
    params: P | undefined;
  }): Promise<T> {
    return (
      await axios.get<T>(`${this.baseUrl}/${endpoint}`, {
        params: { ...params, apiKey: this.apiKey },
      })
    ).data;
  }
}

export class StarWarsApiService extends BaseApiService {
  constructor() {
    super(api.SWAPI_URL);
  }
}

export class OmdbApiService extends BaseApiService {
  constructor() {
    super(api.OMDB_URL, api.OMDB_API_KEY);
  }
}
