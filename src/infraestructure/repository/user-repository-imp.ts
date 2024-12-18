import { UserDynamoDataSource } from '../datasource/user-datasource';
import { UserRepository } from '@src/domain/repository/user-repository';

export class UserRepositoryImp implements UserRepository {
  constructor(protected readonly dataSource: UserDynamoDataSource) {}
  async getUsers(): Promise<UserModel[]> {
    return await this.dataSource.getUsers();
  }

  async registerUser(user: UserModel): Promise<void> {
    await this.dataSource.registerUser(user);
  }

  async findUser(id: string): Promise<UserModel | null> {
    return this.dataSource.findUser(id);
  }

  async findUserByEmail(email: string): Promise<UserModel | null> {
    return await this.dataSource.findUserByEmail(email);
  }

  async updateUser(user: UserModel): Promise<UserModel> {
    return this.dataSource.updateUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.dataSource.deleteUser(id);
  }
}
