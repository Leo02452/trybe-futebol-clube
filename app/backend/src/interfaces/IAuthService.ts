import ILoginBody from './ILoginBody';
import IUser from './IUser';

export default interface IAuthService {
  validateBody(unknown: unknown): Promise<ILoginBody>;
  validateUserData(payload: ILoginBody): Promise<IUser>;
  login(data: ILoginBody): Promise<string>;
  getRole(token: string): Promise<object>;
  validateToken(token: string | undefined): Promise<void>;
}
