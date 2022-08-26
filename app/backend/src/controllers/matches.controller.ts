import { Request, Response } from 'express';
import IAuthService from '../interfaces/IAuthService';
import IMatchesService from '../interfaces/IMatchesService';
import ITeamsService from '../interfaces/ITeamsService';

export default class MatchesController {
  constructor(
    private matchesService: IMatchesService,
    private authService: IAuthService,
    private teamsService: ITeamsService,
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
    const token = await this.authService.validateHeader(req.headers.authorization);

    await this.authService.validateToken(token);

    const matchData = await this.matchesService.validateCreateBody(req.body);

    await this.teamsService.checkIfIsSameTeam(matchData.homeTeam, matchData.awayTeam);

    await this.teamsService.getById(matchData.homeTeam);
    await this.teamsService.getById(matchData.awayTeam);

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
