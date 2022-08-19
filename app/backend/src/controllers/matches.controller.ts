import { Request, Response } from 'express';
import IMatchesService from '../interfaces/IMatchesService';

export default class MatchesController {
  constructor(
    private matchesService: IMatchesService,
  ) { }

  async list(_req: Request, res: Response): Promise<void> {
    const matches = await this.matchesService.list();

    res.status(200).json(matches);
  }

  async filterByProgress(req: Request, res: Response): Promise<void> {
    const { inProgress } = await this.matchesService.validateQuery(req.query);
    const filteredMatches = await this.matchesService
      .filterByProgress(JSON.parse(inProgress));

    res.status(200).json(filteredMatches);
  }
}
