import IMatchScore from './IMatchScore';
import ITeam from './ITeam';

export default interface IMatch extends IMatchScore {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  inProgress?: boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
}
