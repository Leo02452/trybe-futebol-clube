import { IUserTokenPayload } from '../interfaces/IUser';

export default interface ITokenProvider {
  generate(user: IUserTokenPayload): string
  validate(token: string): IUserTokenPayload
}
