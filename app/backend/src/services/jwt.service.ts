import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { IUserWithoutPassword } from '../interfaces/IUser';
import UnauthorizedError from './errors/unauthorized.error';

const { JWT_SECRET } = process.env;

const secret = JWT_SECRET || 'jwt_secret';

export default class JwtService {
  generateToken = async (payload: IUserWithoutPassword): Promise<string> => {
    const token = sign(payload, secret);
    return token;
  };

  public verifyToken = async (token: string): Promise<IUserWithoutPassword> => {
    let userData = {} as IUserWithoutPassword;
    verify(token, secret, (error, decode) => {
      if (error) {
        throw new UnauthorizedError('Token must be a valid token');
      }
      userData = decode as IUserWithoutPassword;
    });
    return userData;
  };
}
