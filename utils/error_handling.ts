import { ValidationError } from 'class-validator';

export class ValidatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidatorError';
    this.message = `🚫 Error de validación: ${message}`;
  }
}

export class RequestBDError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RequestBDError';
    this.message = `🚫 ${message}`;
  }
}

export class ConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConnectionError';
    this.message = '🔌 Error de conexión';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.message = message ??= '🔍 No se encontraron datos';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.message = message ??= '🔐 No autorizado';
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.message = message ??= '🚫 No tiene permisos para realizar esta acción';
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InternalServerError';
    this.message = message ??= '🔥 Error interno del servidor';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
    this.message = message ??= '🔥 Error interno del servidor';
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.message = message ??= '🔥 Error interno del servidor';
  }
}

export const handlingError = (error: Error) => {
  console.error(error);
  if (error instanceof ValidatorError) {
    throw error;
  }
  if (error instanceof ConnectionError) {
    throw error;
  }
  if (error instanceof NotFoundError) {
    throw error;
  }
  if (error instanceof UnauthorizedError) {
    throw error;
  }
  if (error instanceof ForbiddenError) {
    throw error;
  }
  if (error instanceof InternalServerError) {
    throw error;
  }
  if (error instanceof ConflictError) {
    throw error;
  }
  if (error instanceof BadRequestError) {
    throw error;
  }
  if (error instanceof Error) throw error;
};

export const validateEntity = (validateData: ValidationError[]) => {
  if (!validateData.length) return;
  console.log(
    JSON.stringify(validateData?.[0]?.children?.[0]?.children?.[0], null, 2),
  );

  throw new ValidatorError(
    `${validateData[0].property} no cumple con el formato: ${
      validateData[0].value
    } ${validateData.length > 1 ? `... +${validateData.length}` : ''}`,
  );
};

export const ApiError = (statusCode: number, message: string) => {
  if (message === '') {
    message = 'Error interno del servidor';
  }
  return {
    statusCode,
    body: JSON.stringify({ message }),
  };
};
