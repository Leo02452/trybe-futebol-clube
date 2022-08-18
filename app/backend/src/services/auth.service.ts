import { compareSync } from 'bcryptjs';
import IJwtService from '../interfaces/IJwtService';
import User from '../database/models/user';

export default class AuthService {
  constructor(private jwtService: IJwtService) { }
  public login = async (email: string, pwd: string): Promise<string> => {
    const user = await User.findOne({ where: { email } });

    if (!user || !compareSync(pwd, user.password)) {
      throw new Error();
    }

    const { password, ...userWithoutPassword } = user;

    const token = this.jwtService.signUp(userWithoutPassword);
    return token;
  };
}
