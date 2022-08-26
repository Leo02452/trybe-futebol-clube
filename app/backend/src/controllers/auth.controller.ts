import { Request, Response } from 'express';
import ILoginBody from '../interfaces/ILoginBody';
import IAuthService from '../interfaces/IAuthService';

export default class AuthController {
  constructor(
    private authService: IAuthService,
  ) { }

  async login(req: Request, res: Response): Promise<void> {
    const payload: ILoginBody = await this.authService.validateBody(req.body);

    const user = await this.authService.validateUserData(payload);

    const token = await this.authService.login(user);

    res.status(200).json({ token });
  }

  async validate(req: Request, res: Response) {
    const token = await this.authService.validateHeader(req.headers.authorization);

    const jwtPayload = await this.authService.validateToken(token);

    const userRole = await this.authService.getUserRole(jwtPayload);

    res.status(200).json(userRole);
  }
}
