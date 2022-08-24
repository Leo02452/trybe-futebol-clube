import { IUserWithoutPassword } from './IUser';

export default interface IJwtService {
  generateToken(payload: IUserWithoutPassword): Promise<string>;
  verifyToken(token: string): Promise<IUserWithoutPassword>;
}
