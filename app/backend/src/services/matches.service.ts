import Joi = require('joi');
import Match from '../database/models/matches';
import Team from '../database/models/team';
import ICreateMatchBody from '../interfaces/ICreateMatchBody';
import IMatch from '../interfaces/IMatch';
import IUpdateMatchBody from '../interfaces/IUpdateMatchBody';

export default class MatchesService {
  validateQuery = async (unknown: unknown): Promise<boolean> => {
    const schema = Joi.boolean().required();

    const inProgressValue = await schema.validateAsync(unknown);
    return inProgressValue;
  };

  validateCreateBody = async (unknown: unknown): Promise<ICreateMatchBody> => {
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

  validateUpdateBody = async (unknown: unknown): Promise<IUpdateMatchBody> => {
    const schema = Joi.object({
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
    });

    const result = schema.validateAsync(unknown);
    return result;
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

  create = async (matchData: ICreateMatchBody): Promise<object> => {
    const createdMatch = await Match.create({ ...matchData, inProgress: true });
    return createdMatch;
  };

  update = async (matchData: IUpdateMatchBody, id: string): Promise<void> => {
    await Match.update({ ...matchData }, { where: { id } });
  };

  finishMatch = async (id: string): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };
}
