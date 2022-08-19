import { Request, Response } from 'express';
import ITeamsService from '../interfaces/ITeamsService';

export default class TeamsController {
  constructor(
    private teamsService: ITeamsService,
  ) { }

  async list(_req: Request, res: Response): Promise<void> {
    const teams = await this.teamsService.list();

    res.status(200).json(teams);
  }
}
