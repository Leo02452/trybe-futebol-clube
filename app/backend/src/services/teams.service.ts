import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  public list = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };
}
