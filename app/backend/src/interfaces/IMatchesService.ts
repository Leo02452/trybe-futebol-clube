import IMatch from './IMatch';
import IMatchBody from './IMatchBody';
import IMatchQuery from './IMatchQuery';

export default interface IMatchesService {
  list(): Promise<IMatch[]>;
  filterByProgress(inProgress: boolean): Promise<IMatch[]>;
  validateQuery(unknown: unknown): Promise<IMatchQuery>;
  create(matchData: IMatchBody): Promise<object>;
  validateBody(unknown: unknown): Promise<IMatchBody>;
  finishMatch(id: string): Promise<void>;
  validateSameTeam(homeTeam: number, awayTeam: number): Promise<void>;
}
