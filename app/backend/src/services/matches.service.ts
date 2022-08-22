import Joi = require('joi');
import Match from '../database/models/matches';
import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';
import IMatchBody from '../interfaces/IMatchBody';
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

  public create = async (matchData: IMatchBody): Promise<object> => {
    const createdMatch = await Match.create(matchData);
    const createdMatchJSON = createdMatch.toJSON() as IMatchBody;
    return {
      id: createdMatch.id,
      homeTeam: createdMatchJSON.homeTeam,
      homeTeamGoals: createdMatchJSON.homeTeamGoals,
      awayTeam: createdMatchJSON.awayTeam,
      awayTeamGoals: createdMatch.awayTeamGoals,
      inProgress: true,
    };
  };

  public validateBody = async (unknown: unknown): Promise<IMatchBody> => {
    const schema = Joi.object({
      homeTeam: Joi.number().required(),
      awayTeam: Joi.number().required(),
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
      inProgress: Joi.boolean(),
    });

    const result = schema.validateAsync(unknown);
    return result;
  };
}
