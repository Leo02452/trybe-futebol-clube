import ILoginBody from './ILoginBody';

export default interface IAuthService {
  login(email: string, pwd: string): Promise<string>;
  validateBody(unknown: unknown): Promise<ILoginBody>;
  getRole(token: string): Promise<object>;
}
