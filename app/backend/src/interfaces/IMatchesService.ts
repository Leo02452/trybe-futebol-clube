import IMatch from './IMatch';
import IMatchBody from './IMatchBody';
import IMatchUpdateBody from './IMatchUpdateBody';

export default interface IMatchesService {
  list(): Promise<IMatch[]>;
  filterByProgress(inProgress: boolean): Promise<IMatch[]>;
  validateQuery(unknown: unknown): Promise<boolean>;
  create(matchData: IMatchBody): Promise<object>;
  validateBody(unknown: unknown): Promise<IMatchBody>;
  validateSameTeam(homeTeam: number, awayTeam: number): Promise<void>;
  checkIfExists(id: number): Promise<void>;
  finishMatch(id: string): Promise<void>;
  validateUpdateBody(unknown: unknown): Promise<IMatchUpdateBody>;
  update(matchData: IMatchUpdateBody, id: string): Promise<void>;
}
