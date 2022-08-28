import Team from '../database/models/team';
import ITeamMatches from '../interfaces/ITeamMatches';
import { ITeamGoals, ITeamResults, ITeamStats } from '../interfaces/ITeamStats';
import Match from '../database/models/matches';
import IMatchScore from '../interfaces/IMatchScore';
import { Path } from '../interfaces/Path.type';
import { MatchType, GoalType } from '../interfaces/Enums';

export default class LeaderboardService {
  getTeamMatches = async (path: Path): Promise<ITeamMatches[]> => {
    const teamsMatches = await Team.findAll({
      attributes: { exclude: ['id'] },
      include: {
        model: Match,
        as: MatchType[path],
        where: { inProgress: false },
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      },
    });

    return teamsMatches as unknown as ITeamMatches[];
  };

  getFilteredLeaderboard = async (
    teamsMatches: ITeamMatches[],
    path: Path,
  ): Promise<ITeamStats[]> => {
    const teamsStats = teamsMatches
      .map((teamMatches: ITeamMatches) => this._generateTeamStats(teamMatches, path))
      .sort(this._orderByTieBreakers);

    return teamsStats;
  };

  getFullLeaderboard = async (
    homeTeamsMatches: ITeamStats[],
    awayTeamsMatches: ITeamStats[],
  ): Promise<ITeamStats[]> => {
    const teamsFullStats = homeTeamsMatches.map((homeTeamMatches) => {
      const team = awayTeamsMatches
        .find((awayTeamMatches) => homeTeamMatches.name === awayTeamMatches.name);

      if (!team) return homeTeamMatches;

      return this._sumStats(homeTeamMatches, team);
    });

    const fullLeaderboard = teamsFullStats.sort(this._orderByTieBreakers);

    return fullLeaderboard;
  };

  private _generateTeamStats = (teamsMatches: ITeamMatches, path: Path) => {
    const totalGames = teamsMatches[MatchType[path]].length;
    const { totalVictories, totalDraws, totalLosses } = this
      ._getTotalResults(teamsMatches[MatchType[path]], path);
    const { goalsBalance, goalsFavor, goalsOwn } = this
      ._getTotalGoals(teamsMatches[MatchType[path]], path);
    const totalPoints = this._getTotalPoints(totalVictories, totalDraws);

    return {
      name: teamsMatches.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: this._getEffiency(totalPoints, totalGames),
    };
  };

  private _getTotalPoints = (victories: number, draws: number): number => {
    const totalPoints = (victories * 3) + draws;
    return totalPoints;
  };

  private _getTotalResults = (matches: IMatchScore[], path: Path): ITeamResults => {
    const matchResults = matches.reduce((acc, curr) => {
      const opp = path === '/home' ? 'awayTeamGoals' : 'homeTeamGoals';

      switch (true) {
        case curr[GoalType[path]] > curr[opp]:
          return { ...acc, totalVictories: acc.totalVictories + 1 };
        case curr[GoalType[path]] < curr[opp]:
          return { ...acc, totalLosses: acc.totalLosses + 1 };
        case curr[GoalType[path]] === curr[opp]:
          return { ...acc, totalDraws: acc.totalDraws + 1 };
        default:
          break;
      }
      return acc;
    }, { totalVictories: 0, totalDraws: 0, totalLosses: 0 });
    return matchResults;
  };

  private _getTotalGoals = (matches: IMatchScore[], path: Path): ITeamGoals => {
    const teamGoals = matches.reduce((acc, curr) => {
      const opp = path === '/home' ? 'awayTeamGoals' : 'homeTeamGoals';

      const goalsFavor = acc.goalsFavor + curr[GoalType[path]];
      const goalsOwn = acc.goalsOwn + curr[opp];
      const goalsBalance = goalsFavor - goalsOwn;

      return { goalsFavor, goalsOwn, goalsBalance };
    }, { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 });

    return teamGoals;
  };

  private _getEffiency = (points: number, games: number): number => {
    const efficiency = Number(((points / (games * 3)) * 100).toFixed(2));
    return efficiency;
  };

  private _orderByTieBreakers = (a: ITeamStats, b: ITeamStats) => b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor;

  private _sumStats = (home: ITeamStats, away: ITeamStats) => ({
    name: home.name,
    totalPoints: home.totalPoints + away.totalPoints,
    totalGames: home.totalGames + away.totalGames,
    totalVictories: home.totalVictories + away.totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: home.goalsOwn + away.goalsOwn,
    goalsBalance: home.goalsBalance + away.goalsBalance,
    efficiency: this._getEffiency(
      (home.totalPoints + away.totalPoints),
      (home.totalGames + away.totalGames),
    ),
  });
}
