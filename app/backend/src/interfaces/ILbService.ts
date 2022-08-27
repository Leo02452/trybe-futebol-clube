export default interface ILbService {
  // getHome(): Promise<object[]>;
  // getAway(): Promise<object[]>;
  // getAll(): Promise<object>;
  getFilteredLeaderboard(teste: string): Promise<object>;
}
