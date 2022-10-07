import User from '../database/models/user';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
}
