export interface ITeamResults {
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
}

export interface ITeamGoals {
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
}

export interface ITeamStats extends ITeamResults, ITeamGoals {
  name: string | undefined;
  totalPoints: number;
  totalGames: number;
  efficiency: number;
}
