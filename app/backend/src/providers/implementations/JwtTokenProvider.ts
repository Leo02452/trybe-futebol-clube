import * as jwt from 'jsonwebtoken';
import UnauthorizedError from '../../services/errors/unauthorized.error';
import { IUserTokenPayload } from '../../interfaces/IUser';
import ITokenProvider from '../ITokenProvider';

export default class JwtTokenProvider implements ITokenProvider {
  private _jwt;
  private _secret: string;
  private _signOptions: jwt.SignOptions;

  constructor() {
    this._jwt = jwt;
    this._secret = 'jwt_secret';
    this._signOptions = { expiresIn: '7d', algorithm: 'HS256' };
  }

  generate(user: IUserTokenPayload): string {
    const token = this._jwt.sign(user, this._secret, this._signOptions);

    return token;
  }

  validate(token: string): IUserTokenPayload {
    try {
      const userData = this._jwt.verify(token, this._secret);
      return userData as IUserTokenPayload;
    } catch (error) {
      throw new UnauthorizedError('Token must be a valid token');
    }
  }
}
