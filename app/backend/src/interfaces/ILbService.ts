import ITeamMatches from './ITeamMatches';
import { ITeamStats } from './ITeamStats';
import { Path } from './Path.type';

export default interface ILbService {
  getTeamMatches(path: Path): Promise<ITeamMatches[]>
  getFilteredLeaderboard(teamsMatches: ITeamMatches[], path: Path): Promise<ITeamStats[]>;
  getFullLeaderboard(
    homeTeamsMatches: ITeamStats[],
    awayTeamsMatches: ITeamStats[],
  ): Promise<ITeamStats[]>;
}
