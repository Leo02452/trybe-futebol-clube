import { Request, Response } from 'express';
import ILbService from '../interfaces/ILbService';

export default class LeaderboardController {
  constructor(
    private lbService: ILbService,
  ) { }

  async getHome(_req: Request, res: Response): Promise<void> {
    const result = await this.lbService.getHome();
    res.status(200).json(result);
  }

  async getAway(_req: Request, res: Response): Promise<void> {
    const result = await this.lbService.getAway();
    res.status(200).json(result);
  }
}
