export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};

export const generateEventsHttpApi = () => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  const paths = ['{proceso}', '{proceso}/{metodo}'];
  return methods
    .map((method) => {
      return paths.map((path) => {
        return {
          httpApi: {
            method,
            path: `/api/${path}`,
            swaggerTags: [path.split('/')[0]],
          },
        };
      });
    })
    .flat();
};
