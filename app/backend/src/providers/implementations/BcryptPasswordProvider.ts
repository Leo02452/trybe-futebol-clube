import * as brcyrpt from 'bcryptjs';
import IPasswordProvider from '../IPasswordProvider';

export default class BcryptPasswordProvider implements IPasswordProvider {
  private _bcrypt;
  constructor() {
    this._bcrypt = brcyrpt;
  }

  async encrypt(password: string): Promise<string> {
    const salt = 10;
    const hashPassword = await this._bcrypt.hash(password, salt);

    return hashPassword;
  }

  async validate(password: string, hashPassword: string): Promise<boolean> {
    const isCorrectPassword = await this._bcrypt.compare(password, hashPassword);

    return isCorrectPassword;
  }
}
