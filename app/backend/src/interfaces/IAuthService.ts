import IUserLogin from './IUserLogin';
import IUser, { IUserWithoutPassword } from './IUser';

export default interface IAuthService {
  validateBody(unknown: unknown): Promise<IUserLogin>;
  validateHeader(unknown: unknown): Promise<string>;
  validateUserData(payload: IUserLogin): Promise<IUser>;
  login(data: IUserLogin): Promise<string>;
  getUserRole(jwtPayload: IUserWithoutPassword): Promise<object>;
  validateToken(token: string): Promise<IUserWithoutPassword>;
}
