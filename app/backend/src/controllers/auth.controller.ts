import { Request, Response } from 'express';
import ILoginDTO from '../services/Login/ILoginDTO';
import IAuthService from '../interfaces/IAuthService';
import LoginService from '../services/Login/LoginService';

export default class AuthController {
  constructor(
    private authService: IAuthService,
    private _loginService: LoginService,
  ) { }

  async login(req: Request, res: Response): Promise<void> {
    const token = await this._loginService.execute(req.body as ILoginDTO);

    res.status(200).json({ token });
  }

  async validate(req: Request, res: Response) {
    const token = await this.authService.validateHeader(req.headers.authorization);

    const jwtPayload = await this.authService.validateToken(token);

    const userRole = await this.authService.getUserRole(jwtPayload);

    res.status(200).json(userRole);
  }
}
