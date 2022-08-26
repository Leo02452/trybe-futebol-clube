import IUserLogin from './IUserLogin';

export default interface IUser extends IUserLogin {
  id: number,
  username: string,
  role: string,
}

export type IUserWithoutPassword = Omit<IUser, 'password'>;
