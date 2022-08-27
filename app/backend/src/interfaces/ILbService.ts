import { ITeamStats } from './ITeamStats';

export default interface ILbService {
  getFilteredLeaderboard(teste: string): Promise<ITeamStats[]>;
  getFullLeaderboard(): Promise<ITeamStats[]>;
}
