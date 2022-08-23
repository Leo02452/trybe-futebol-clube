import Joi = require('joi');
import Match from '../database/models/matches';
import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';
import IMatchBody from '../interfaces/IMatchBody';
import IMatchQuery from '../interfaces/IMatchQuery';
import IMatchUpdateBody from '../interfaces/IMatchUpdateBody';
import NotFoundError from './errors/notfound.error';
import UnauthorizedError from './errors/unauthorized.error';

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

  public validateSameTeam = async (homeTeam: number, awayTeam: number): Promise<void> => {
    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }
  };

  public checkIfExists = async (id: number): Promise<void> => {
    const team = await Team.findByPk(id);
    if (!team) {
      throw new NotFoundError('There is no team with such id!');
    }
  };

  public finishMatch = async (id: string): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  public validateUpdateBody = async (unknown: unknown): Promise<IMatchUpdateBody> => {
    const schema = Joi.object({
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
    });

    const result = schema.validateAsync(unknown);
    return result;
  };

  public update = async (matchData: IMatchUpdateBody, id: string): Promise<void> => {
    await Match.update({ ...matchData }, { where: { id } });
  };
}
