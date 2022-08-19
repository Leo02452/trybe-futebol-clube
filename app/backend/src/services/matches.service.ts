import Joi = require('joi');
import Match from '../database/models/matches';
import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';
import IMatchQuery from '../interfaces/IMatchQuery';

export default class MatchesService {
  public list = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  public filterByProgress = async (inProgress: boolean): Promise<IMatch[]> => {
    const filteredMatches = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return filteredMatches;
  };

  public validateQuery = async (unknown: unknown): Promise<IMatchQuery> => {
    const schema = Joi.object({
      inProgress: Joi.string().required(),
    });
    const result = await schema.validateAsync(unknown);
    return result;
  };
}
