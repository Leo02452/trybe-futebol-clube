import { Request, Response } from 'express';
import ILoginBody from '../interfaces/ILoginBody';
import IAuthService from '../interfaces/IAuthService';

export default class AuthController {
  constructor(
    private authService: IAuthService,
  ) { }

  async login(req: Request, res: Response): Promise<void> {
    const body: ILoginBody = await this.authService.validateBody(req.body);

    const token = await this.authService.login(body.email, body.password);

    res.status(200).json({ token });
  }
}
