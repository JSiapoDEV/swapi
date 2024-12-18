import { UserDynamoDataSource } from '../datasource/user-datasource';
import { UserRepositoryImp } from '../repository/user-repository-imp';
import { UserService } from '@src/application/user-service';

const dataSource = new UserDynamoDataSource();
const repository = new UserRepositoryImp(dataSource);
const service = new UserService(repository);

export { service };
