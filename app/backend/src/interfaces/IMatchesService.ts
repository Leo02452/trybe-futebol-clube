import IMatch from './IMatch';
import IMatchScore from './IMatchScore';

export default interface IMatchesService {
  validateQuery(unknown: unknown): Promise<boolean>;
  validateCreateBody(unknown: unknown): Promise<IMatch>;
  validateUpdateBody(unknown: unknown): Promise<IMatchScore>;
  checkIfExists(id: string): Promise<void>;
  list(): Promise<IMatch[]>;
  filterByProgress(inProgress: boolean): Promise<IMatch[]>;
  create(matchData: IMatch): Promise<IMatch>;
  update(matchData: IMatchScore, id: string): Promise<void>;
  finish(id: string): Promise<void>;
}
