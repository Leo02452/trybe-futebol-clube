import IMatchBody from './ICreateMatchBody';
import IMatch from './IMatch';
import IMatchUpdateBody from './IUpdateMatchBody';

export default interface IMatchesService {
  validateQuery(unknown: unknown): Promise<boolean>;
  validateCreateBody(unknown: unknown): Promise<IMatchBody>;
  validateUpdateBody(unknown: unknown): Promise<IMatchUpdateBody>;
  list(): Promise<IMatch[]>;
  filterByProgress(inProgress: boolean): Promise<IMatch[]>;
  create(matchData: IMatchBody): Promise<object>;
  update(matchData: IMatchUpdateBody, id: string): Promise<void>;
  finishMatch(id: string): Promise<void>;
}
