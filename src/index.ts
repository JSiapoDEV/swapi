import { generateEventsHttpApi, handlerPath } from '@functions/handler-resolver';

import { AWS } from '@serverless/typescript';

export const api: AWS['functions'][''] = {
  handler: `${handlerPath(__dirname)}/router.router`,
  events: generateEventsHttpApi('film'),
};

export default { api };
