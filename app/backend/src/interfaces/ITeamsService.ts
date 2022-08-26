import ITeam from './ITeam';

export default interface ITeamsService {
  validateParamsId(unknown: unknown): Promise<number>
  list(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam>
  checkIfIsSameTeam(homeTeam: number, awayTeam: number): Promise<void>
}
