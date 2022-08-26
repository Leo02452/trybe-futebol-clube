import IUpdateMatchBody from './IUpdateMatchBody';

export default interface ICreateMatchBody extends IUpdateMatchBody {
  homeTeam: number;
  awayTeam: number;
  inProgress?: boolean;
}
