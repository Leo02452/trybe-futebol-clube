import { IUserWithoutPassword } from './IUser';

export default interface IJwtService {
  signUp(payload: { id: number, email: string }): Promise<string>;
  verifyToken(token: string): Promise<IUserWithoutPassword>;
}
