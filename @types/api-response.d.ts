type RequestWithJWT<T> = T & {
  jwt: string;
};

type Result<T> = {
  count?: number;
  next?: string;
  previous?: null;
  results?: T[];
};
