import { Request, Response } from 'express';
import IAuthService from '../interfaces/IAuthService';
import IMatchesService from '../interfaces/IMatchesService';

export default class MatchesController {
  constructor(
    private matchesService: IMatchesService,
    private authService: IAuthService,
  ) { }

  async list(req: Request, res: Response): Promise<void> {
    let matches;

    const { inProgress } = req.query;

    if (inProgress === undefined) {
      matches = await this.matchesService.list();
    } else {
      const inProgressValue = await this.matchesService.validateQuery(inProgress);
      matches = await this.matchesService.filterByProgress(inProgressValue);
    }

    res.status(200).json(matches);
  }

  async create(req: Request, res: Response): Promise<void> {
    await this.authService.validateToken(req.headers.authorization);

    const matchData = await this.matchesService
      .validateBody(req.body);

    await this.matchesService.validateSameTeam(matchData.homeTeam, matchData.awayTeam);

    await this.matchesService.checkIfExists(matchData.homeTeam);
    await this.matchesService.checkIfExists(matchData.awayTeam);

    const createdMatch = await this.matchesService
      .create(matchData);

    res.status(201).json(createdMatch);
  }

  async finish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.matchesService.finishMatch(id);

    res.status(200).json({ message: 'finished' });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const matchData = await this.matchesService.validateUpdateBody(req.body);

    await this.matchesService.update(matchData, id);

    res.status(200).json({ message: 'match updated!' });
  }
}
