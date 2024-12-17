export const AWS = {
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      get: jest.fn().mockReturnThis(),
      put: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      query: jest.fn().mockReturnThis(),
      promise: jest.fn(),
    })),
  },
};
