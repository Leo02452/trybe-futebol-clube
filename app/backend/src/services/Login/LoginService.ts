import IUserRepository from '../../interfaces/IUsersRepository';
import IPasswordProvider from '../../providers/IPasswordProvider';
import ITokenProvider from '../../providers/ITokenProvider';
import UnauthorizedError from '../errors/unauthorized.error';
import ILoginDTO from './ILoginDTO';

export default class LoginService {
  constructor(
    private _usersRepository: IUserRepository,
    private _passwordProvider: IPasswordProvider,
    private _tokenProvider: ITokenProvider,
  ) { }

  async execute(data: ILoginDTO): Promise<string> {
    const user = await this._usersRepository.findByEmail(data.email);

    if (!user) throw new UnauthorizedError('Incorrect email or password');

    const isCorrectPassword = await this._passwordProvider.validate(data.password, user.password);

    if (!isCorrectPassword) throw new UnauthorizedError('Incorrect email or password');

    const { password, ...userWithoutPassword } = user;

    const token = this._tokenProvider.generate(userWithoutPassword);

    return token;
  }
}
