export interface UserRepository {
  getUsers(): Promise<UserModel[]>;
  registerUser(user: UserModel): Promise<void>;
  findUser(id: string): Promise<UserModel | null>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  updateUser(user: UserModel): Promise<UserModel>;
  deleteUser(id: string): Promise<void>;
}
