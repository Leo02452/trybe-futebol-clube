import { Request, Response } from 'express';
import IAuthService from '../interfaces/IAuthService';
import IMatchesService from '../interfaces/IMatchesService';

export default class MatchesController {
  constructor(
    private matchesService: IMatchesService,
    private authService: IAuthService,
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

  async create(req: Request, res: Response): Promise<void> {
    await this.authService.validateToken(req.headers.authorization);

    const matchData = await this.matchesService
      .validateBody(req.body);

    const createdMatch = await this.matchesService
      .create(matchData);

    res.status(201).json(createdMatch);
  }

  async finishMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.matchesService.finishMatch(id);

    res.status(200).json({ message: 'finished' });
  }
}
