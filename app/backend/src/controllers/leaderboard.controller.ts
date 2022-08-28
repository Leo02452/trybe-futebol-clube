import { Request, Response } from 'express';
import { Path } from '../interfaces/Path.type';
import ILbService from '../interfaces/ILbService';

export default class LeaderboardController {
  constructor(
    private lbService: ILbService,
  ) { }

  async getFilteredLeaderboard(req: Request, res: Response): Promise<void> {
    const teamsMatches = await this.lbService.getTeamMatches(req.path as Path);

    const filteredLeaderboard = await this.lbService
      .getFilteredLeaderboard(teamsMatches, req.path as Path);

    res.status(200).json(filteredLeaderboard);
  }

  async getFullLeaderboard(_req: Request, res: Response): Promise<void> {
    const homeTeamsMatches = await this.lbService.getTeamMatches('/home');
    const awayTeamsMatches = await this.lbService.getTeamMatches('/away');

    const homeLeaderboard = await this.lbService
      .getFilteredLeaderboard(homeTeamsMatches, '/home');
    const awayLeaderboard = await this.lbService
      .getFilteredLeaderboard(awayTeamsMatches, '/away');

    const result = await this.lbService.getFullLeaderboard(homeLeaderboard, awayLeaderboard);
    res.status(200).json(result);
  }
}
