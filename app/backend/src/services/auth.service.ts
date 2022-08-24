import { compareSync } from 'bcryptjs';
import Joi = require('joi');
import ILoginBody from '../interfaces/ILoginBody';
import IJwtService from '../interfaces/IJwtService';
import User from '../database/models/user';
import UnauthorizedError from './errors/unauthorized.error';
import NotFoundError from './errors/notfound.error';
import IUser, { IUserWithoutPassword } from '../interfaces/IUser';

export default class AuthService {
  constructor(private jwtService: IJwtService) { }

  validateBody = async (unknown: unknown): Promise<ILoginBody> => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }).messages({ 'string.empty': 'All fields must be filled' });

    const payload = await schema.validateAsync(unknown);
    return payload;
  };

  validateHeader = async (unknown: unknown): Promise<string> => {
    const schema = Joi.string().required()
      .messages({ 'string.empty': 'Token not found!' });

    const token = await schema.validateAsync(unknown);
    return token;
  };

  validateUserData = async (payload: ILoginBody): Promise<IUser> => {
    const user = await User.findOne({ where: { email: payload.email }, raw: true });

    if (!user || !compareSync(payload.password, user.password)) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    return user;
  };

  newValidateToken = async (token: string): Promise<IUserWithoutPassword> => {
    const userData = await this.jwtService.verifyToken(token);
    return userData;
  };

  login = async (user: IUser): Promise<string> => {
    const { password, ...userWithoutPassword } = user;

    const token = this.jwtService.generateToken(userWithoutPassword);
    return token;
  };

  getUserRole = async (jwtPayload: IUserWithoutPassword): Promise<object> => {
    const user = await User.findOne({ where: { email: jwtPayload.email } });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return { role: user.role };
  };

  validateToken = async (token: string | undefined): Promise<void> => {
    if (!token) {
      throw new NotFoundError('Token not found!');
    }
    await this.jwtService.verifyToken(token);
  };
}
