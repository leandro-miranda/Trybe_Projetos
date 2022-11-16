import ILogin from '../interfaces/login.interface';
import connection from '../models/connection';
import LoginModel from '../models/login.model';

class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async login(login: ILogin): Promise<ILogin[]> {
    const result = await this.model.login(login);
    return result;
  }
}
    
export default LoginService;