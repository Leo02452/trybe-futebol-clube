import { Request, Response } from 'express';
import ILoginBody from '../interfaces/ILoginBody';
import IAuthService from '../interfaces/IAuthService';
import NotFoundError from '../services/errors/notfound.error';

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
    const token = req.headers?.authorization;
    if (!token) {
      throw new NotFoundError('Token not found');
    }
    const role = await this.authService.getRole(token);
    res.status(200).json(role);
  }
}
