import { checkPassword, encrypt } from '@utils/encrypt';
import { decode, encode } from '@utils/token';

import { Params } from '@domain/http';
import { UnauthorizedError } from '@utils/error_handling';
import { service } from '@src/infraestructure/container/user-container';
import { v4 } from 'uuid';

export const getUsers = async (req: Params): Promise<any> => {
  const users = await service.getUsers();
  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};

export const registerUser = async (req: Params): Promise<any> => {
  const user = req.body as UserModel;
  user.id = v4();
  user.password = await encrypt(user.password);
  await service.registerUser(user);
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'User registered' }),
  };
};

export const refreshToken = async (req: Params): Promise<any> => {
  const token =
    (req.headers['authorization'] || req.headers['Authorization'] || '').split(
      ' ',
    )[1] || '';

  if (!token) {
    throw new UnauthorizedError('Token not found');
  }
  const { id } = await decode<{ id: string }>(token);
  const user = await service.findUser(id);
  if (!user) {
    throw new UnauthorizedError('User not found');
  }
  const newToken = await refreshToken(token);
  return {
    statusCode: 200,
    body: JSON.stringify({ token: newToken }),
  };
};

// Login
export const login = async (req: Params): Promise<any> => {
  const { email, password } = req.body as any;
  const user = await service.findUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError('User not found');
  }
  console.log('user', user);
  console.log('password', password);
  const isValidePassword = await checkPassword(password, user.password);

  if (!isValidePassword) {
    throw new UnauthorizedError('Invalid password');
  }
  const token = encode({ id: user.id });
  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};
