import Joi = require('joi');
import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';
import NotFoundError from './errors/notfound.error';
import UnauthorizedError from './errors/unauthorized.error';

export default class TeamsService {
  validateParamsId = async (unknown: unknown): Promise<number> => {
    const schema = Joi.object({
      id: Joi.number().integer().required().positive(),
    });

    const { id } = await schema.validateAsync(unknown);
    return id;
  };

  list = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  getById = async (id: number): Promise<ITeam> => {
    const team = await Team.findByPk(id);

    if (!team) {
      throw new NotFoundError('There is no team with such id!');
    }

    return team;
  };

  checkIfIsSameTeam = async (homeTeam: number, awayTeam: number): Promise<void> => {
    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }
  };
}
