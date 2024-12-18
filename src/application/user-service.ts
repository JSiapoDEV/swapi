import { UserRepository } from '@src/domain/repository/user-repository';

export class UserService {
  constructor(protected readonly repository: UserRepository) {}

  async getUsers() {
    return await this.repository.getUsers();
  }

  async registerUser(user: UserModel): Promise<void> {
    await this.repository.registerUser(user);
  }

  async findUser(id: string) {
    return await this.repository.findUser(id);
  }

  async findUserByEmail(email: string) {
    return await this.repository.findUserByEmail(email);
  }

  async updateUser(user: UserModel) {
    return await this.repository.updateUser(user);
  }

  async deleteUser(id: string) {
    return await this.repository.deleteUser(id);
  }
}
