import { Pool, ResultSetHeader } from 'mysql2/promise';
import ILogin from '../interfaces/login.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async login(loginData: ILogin): Promise<ILogin[]> {
    const { username, password } = loginData;
    const [rows] = await this.connection.execute<ILogin[] & ResultSetHeader>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );

    return rows;
  }
}
