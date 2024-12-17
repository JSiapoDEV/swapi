import { FilmDynamoDatasource } from './datasource/film-datasource';
import { FilmRepository } from '../domain/repository/film-repository';
import { FilmRepositoryImp } from '../infraestructure/repository/film-repository-imp';
import { FilmService } from '../application/film-service';

const datasource = new FilmDynamoDatasource();
const repository: FilmRepository = new FilmRepositoryImp(datasource);
const service = new FilmService(repository);

export { service };
