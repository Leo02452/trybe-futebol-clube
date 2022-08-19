import IMatch from './IMatch';

export default interface IMatchesService {
  list(): Promise<IMatch[]>
}
