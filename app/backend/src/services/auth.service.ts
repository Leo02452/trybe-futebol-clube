import { compareSync } from 'bcryptjs';
import Joi = require('joi');
import ILoginBody from '../interfaces/ILoginBody';
import IJwtService from '../interfaces/IJwtService';
import User from '../database/models/user';

export default class AuthService {
  constructor(private jwtService: IJwtService) { }

  public validateBody = async (unknown: unknown): Promise<ILoginBody> => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).messages({ 'string.empty': 'All fields must be filled' });
    const result = await schema.validateAsync(unknown);
    return result;
  };

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
