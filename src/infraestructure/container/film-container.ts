import { FilmCacheDynamoDatasource } from '../datasource/film-cache-datasource';
import { FilmDynamoDatasource } from '../datasource/film-datasource';
import { FilmRepository } from '../../domain/repository/film-repository';
import { FilmRepositoryImp } from '../repository/film-repository-imp';
import { FilmService } from '../../application/film-service';

const datasource = new FilmDynamoDatasource();
const cache = new FilmCacheDynamoDatasource();
const repository: FilmRepository = new FilmRepositoryImp(datasource, cache);
const service = new FilmService(repository);

export { service };
