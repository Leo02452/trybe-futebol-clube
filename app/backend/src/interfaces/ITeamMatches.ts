import IMatchScore from './IMatchScore';
import ITeam from './ITeam';

export default interface ITeamMatches extends ITeam {
  homeMatches: IMatchScore[];
  awayMatches: IMatchScore[];
}
