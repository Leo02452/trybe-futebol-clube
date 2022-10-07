import IUserRepository from '../interfaces/IUsersRepository';
import User from '../database/models/user';

export default class UserRepository implements IUserRepository {
  constructor(private _userModel: typeof User) { }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this._userModel.findOne({ where: { email }, raw: true });

    return user;
  }
}
