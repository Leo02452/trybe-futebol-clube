import Joi = require('joi');
import Match from '../database/models/matches';
import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';
import IMatchScore from '../interfaces/IMatchScore';
import NotFoundError from './errors/notfound.error';

export default class MatchesService {
  validateQuery = async (unknown: unknown): Promise<boolean> => {
    const schema = Joi.boolean().required();

    const inProgressValue = await schema.validateAsync(unknown);
    return inProgressValue;
  };

  validateCreateBody = async (unknown: unknown): Promise<IMatch> => {
    const schema = Joi.object({
      homeTeam: Joi.number().required(),
      awayTeam: Joi.number().required(),
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
      inProgress: Joi.boolean().optional(),
    });

    const result = schema.validateAsync(unknown);
    return result;
  };

  validateUpdateBody = async (unknown: unknown): Promise<IMatchScore> => {
    const schema = Joi.object({
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
    });

    const result = schema.validateAsync(unknown);
    return result;
  };

  checkIfExists = async (id: string): Promise<void> => {
    const match = await Match.findByPk(id);

    if (!match) {
      throw new NotFoundError('Match not found!');
    }
  };

  list = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  };

  filterByProgress = async (inProgress: boolean): Promise<IMatch[]> => {
    const filteredMatches = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return filteredMatches;
  };

  create = async (matchData: IMatch): Promise<IMatch> => {
    const createdMatch = await Match.create({ ...matchData, inProgress: true });
    return createdMatch;
  };

  update = async (matchScore: IMatchScore, id: string): Promise<void> => {
    await Match.update({ ...matchScore }, { where: { id } });
  };

  finish = async (id: string): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };
}
