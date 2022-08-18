import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { IUserWithoutPassword } from '../interfaces/IUser';

const { JWT_SECRET } = process.env;

const secret = JWT_SECRET || 'jwt_secret';

export default class JwtService {
  public signUp = async (payload: IUserWithoutPassword): Promise<string> => sign(payload, secret);
}
