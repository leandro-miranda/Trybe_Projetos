import IUser from '../interfaces/user.interface';
import connection from '../models/connection';
import UserModel from '../models/user.model';

export default class UserService {
  constructor(private userModel = new UserModel(connection)) { }

  public async createUser(body: IUser): Promise<IUser> {
    return this.userModel.createUser(body);
  }
}