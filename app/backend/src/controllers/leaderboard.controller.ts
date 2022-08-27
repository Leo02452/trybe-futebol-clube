import { Request, Response } from 'express';
import ILbService from '../interfaces/ILbService';

export default class LeaderboardController {
  constructor(
    private lbService: ILbService,
  ) { }

  async getFilteredLeaderboard(req: Request, res: Response): Promise<void> {
    const filteredLeaderboard = await this.lbService.getFilteredLeaderboard(req.path);
    res.status(200).json(filteredLeaderboard);
  }

  async getFullLeaderboard(_req: Request, res: Response): Promise<void> {
    const result = await this.lbService.getFullLeaderboard();
    res.status(200).json(result);
  }
}
