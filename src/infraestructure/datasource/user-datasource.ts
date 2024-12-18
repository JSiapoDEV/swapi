import { NotFoundError } from '@utils/error_handling';
import { api } from '@src/config';
import { dynamoDb } from '@domain/dynamodb';

interface UserDataSouce {
  getUsers(): Promise<UserModel[]>;
  registerUser(user: UserModel): Promise<void>;
  findUser(id: string): Promise<UserModel | null>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  updateUser(user: UserModel): Promise<UserModel>;
  deleteUser(id: string): Promise<void>;
}

export class UserDynamoDataSource implements UserDataSouce {
  async getUsers(): Promise<UserModel[]> {
    const params = {
      TableName: api.DYNAMO_TABLE_USER,
    };

    const { Items } = await dynamoDb.scan(params).promise();
    return Items as UserModel[];
  }
  async registerUser(user: UserModel): Promise<void> {
    console.log('registerUser', user);
    const params = {
      TableName: api.DYNAMO_TABLE_USER,
      Item: {
        ...user,
      },
    };

    await dynamoDb.put(params).promise();
  }

  async findUserByEmail(email: string): Promise<UserModel | null> {
    const params = {
      TableName: api.DYNAMO_TABLE_USER,
      FilterExpression: '#email = :email',
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const { Items } = await dynamoDb.scan(params).promise();
    if (Items.length === 0) {
      return null;
    }
    return Items[0] as UserModel;
  }

  async findUser(id: string): Promise<UserModel | null> {
    const params = {
      TableName: api.DYNAMO_TABLE_USER,
      Key: {
        id,
      },
    };

    const { Item } = await dynamoDb.get(params).promise();
    if (!Item) {
      return null;
    }
    return Item as UserModel;
  }

  async updateUser(user: UserModel): Promise<UserModel> {
    const params = {
      TableName: api.DYNAMO_TABLE_USER,
      Key: {
        id: user.id,
      },
      UpdateExpression:
        'set #nombre = :nombre, #apellido = :apellido, #edad = :edad, #estado = :estado',
      ExpressionAttributeNames: {
        '#nombre': 'nombre',
        '#apellido': 'apellido',
        '#edad': 'edad',
      },
      ExpressionAttributeValues: {
        ':nombre': user.name,
        ':email': user.email,
        ':password': user.password,
      },
      ReturnValues: 'ALL_NEW',
    };

    const { Attributes } = await dynamoDb.update(params).promise();
    return Attributes as UserModel;
  }

  async deleteUser(id: string): Promise<void> {
    const params = {
      TableName: api.DYNAMO_TABLE_USER,
      Key: {
        id,
      },
    };

    await dynamoDb.delete(params).promise();
  }
}
