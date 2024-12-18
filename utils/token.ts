import jwt from 'jsonwebtoken';

export const decode = <T>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded: any) => {
      if (error) reject({ message: 'No se pudo decodificar' });
      if (decoded) resolve(decoded as T);
      reject({ message: 'No decoded' });
    });
  });
};

export const encode = (payload: any, duration = 8) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${duration}h`,
  });

export const refreshToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded: any) => {
      if (error) reject({ message: 'No se pudo decodificar' });
      if (decoded) {
        resolve(encode(decoded as never));
      }
      reject({ message: 'No decoded' });
    });
  });
};
