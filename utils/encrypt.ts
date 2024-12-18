import crypto from 'crypto';

const KEY_LENGTH = 64; // Longitud de la clave derivada
const SALT_LENGTH = 16; // Longitud del salt en bytes
const ITERATIONS = 16384; // Número de iteraciones
const DIGEST = 'sha512'; // Algoritmo de hash

/**
 * Encripta una contraseña utilizando scrypt de manera asíncrona.
 * @param password La contraseña a encriptar.
 * @returns Una promesa que resuelve con la contraseña encriptada en formato "salt:hash".
 */
export const encrypt = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Generar un salt aleatorio
    const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');

    crypto.scrypt(
      password,
      salt,
      KEY_LENGTH,
      { N: 16384, r: 8, p: 1 },
      (err, derivedKey) => {
        if (err) reject(err);
        // Almacenar el salt junto con la contraseña derivada
        resolve(`${salt}:${derivedKey.toString('hex')}`);
      },
    );
  });
};

/**
 * Verifica una contraseña comparándola con una versión encriptada.
 * @param password La contraseña proporcionada por el usuario.
 * @param encrypted La contraseña encriptada almacenada (formato "salt:hash").
 * @returns Una promesa que resuelve con `true` si la contraseña coincide, de lo contrario `false`.
 */
export const checkPassword = async (
  password: string,
  encrypted: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const [salt, key] = encrypted.split(':');
    crypto.scrypt(
      password,
      salt,
      KEY_LENGTH,
      { N: 16384, r: 8, p: 1 },
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex') === key);
      },
    );
  });
};
