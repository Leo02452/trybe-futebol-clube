import IMatch from './IMatch';
import IMatchQuery from './IMatchQuery';

export default interface IMatchesService {
  list(): Promise<IMatch[]>;
  filterByProgress(inProgress: boolean): Promise<IMatch[]>
  validateQuery(unknown: unknown): Promise<IMatchQuery>
}
