import { compareSync } from 'bcryptjs';
import Joi = require('joi');
import ILoginBody from '../interfaces/ILoginBody';
import IJwtService from '../interfaces/IJwtService';
import User from '../database/models/user';
import UnauthorizedError from './errors/unauthorized.error';
import NotFoundError from './errors/notfound.error';
import IUser from '../interfaces/IUser';

export default class AuthService {
  constructor(private jwtService: IJwtService) { }

  public validateBody = async (unknown: unknown): Promise<ILoginBody> => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }).messages({ 'string.empty': 'All fields must be filled' });

    const payload = await schema.validateAsync(unknown);
    return payload;
  };

  validateUserData = async (payload: ILoginBody): Promise<IUser> => {
    const user = await User.findOne({ where: { email: payload.email }, raw: true });

    if (!user || !compareSync(payload.password, user.password)) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    return user;
  };

  login = async (user: IUser): Promise<string> => {
    const { password, ...userWithoutPassword } = user;

    const token = this.jwtService.signUp(userWithoutPassword);
    return token;
  };

  public getRole = async (token: string): Promise<object> => {
    const userData = await this.jwtService.verifyToken(token);
    const user = await User.findOne({ where: { email: userData.email } });
    return { role: user?.role };
  };

  public validateToken = async (token: string | undefined): Promise<void> => {
    if (!token) {
      throw new NotFoundError('Token not found!');
    }
    await this.jwtService.verifyToken(token);
  };
}
