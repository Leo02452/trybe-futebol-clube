import ILoginBody from './ILoginBody';
import IUser, { IUserWithoutPassword } from './IUser';

export default interface IAuthService {
  validateBody(unknown: unknown): Promise<ILoginBody>;
  validateHeader(unknown: unknown): Promise<string>;
  validateUserData(payload: ILoginBody): Promise<IUser>;
  login(data: ILoginBody): Promise<string>;
  getUserRole(jwtPayload: IUserWithoutPassword): Promise<object>;
  newValidateToken(token: string): Promise<IUserWithoutPassword>;
  validateToken(token: string | undefined): Promise<void>;
}
