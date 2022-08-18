export default interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
}

export type IUserWithoutPassword = Omit<IUser, 'password'>;
