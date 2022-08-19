import ITeam from './ITeam';

export default interface ITeamsService {
  list(): Promise<ITeam[]>
}
