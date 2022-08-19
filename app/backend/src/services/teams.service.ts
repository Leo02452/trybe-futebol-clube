import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  public list = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  public getById = async (id: number): Promise<ITeam> => {
    const team = await Team.findByPk(id);
    return team as ITeam;
  };
}
