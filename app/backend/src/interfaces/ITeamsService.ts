import ITeam from './ITeam';

export default interface ITeamsService {
  list(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam>
  validateParamsId(unknown: unknown): Promise<number>
}
