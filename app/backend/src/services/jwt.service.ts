import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { IUserWithoutPassword } from '../interfaces/IUser';

const { JWT_SECRET } = process.env;

const secret = JWT_SECRET || 'jwt_secret';

export default class JwtService {
  public signUp = async (payload: IUserWithoutPassword): Promise<string> => sign(payload, secret);
  public verifyToken = async (token: string): Promise<IUserWithoutPassword> => {
    const userData = verify(token, secret);
    return userData as IUserWithoutPassword;
  };
}
