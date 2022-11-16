import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async createUser(body: IUser): Promise<IUser> {
    const { username, classe, level, password } = body;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?,?,?,?)',
      [username, classe, level, password],
    );

    return { id: insertId, username, classe, level } as IUser;
  }
}