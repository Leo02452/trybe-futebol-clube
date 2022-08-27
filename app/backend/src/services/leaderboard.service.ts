// import IMatchResults from '../interfaces/IMatchResults';
import Team from '../database/models/team';
import Match from '../database/models/matches';
import { ITeamGoals, ITeamResults, ITeamStats } from '../interfaces/ITeamStats';
import IMatchScore from '../interfaces/IMatchScore';
import ITeamMatches from '../interfaces/ITeamMatches';

type Path = '/home' | '/away';

enum MatchType {
  '/home' = 'homeMatches',
  '/away' = 'awayMatches',
}

export default class LeaderboardService {
  getFilteredLeaderboard = async (path: Path) => {
    const teamsMatches = await Team.findAll({
      attributes: { exclude: ['id'] },
      include: {
        model: Match,
        as: MatchType[path],
        where: { inProgress: false },
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      },
    });

    const teamsMatchesJSON = teamsMatches
      .map((teamMatches) => teamMatches.toJSON()) as unknown as ITeamMatches[];

    const result = teamsMatchesJSON
      .map(this._generateTeamStats)
      .sort(this._orderByTieBreakers);

    return result;
  };

  private _generateTeamStats = (teamsMatches: ITeamMatches) => {
    const totalGames = teamsMatches.homeMatches.length;
    const { totalVictories, totalDraws, totalLosses } = this
      ._getTotalResults(teamsMatches.homeMatches);
    const { goalsBalance, goalsFavor, goalsOwn } = this._getTotalGoals(teamsMatches.homeMatches);
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

  private _getTotalResults = (matches: IMatchScore[]): ITeamResults => {
    const matchResults = matches.reduce((acc, curr) => {
      switch (true) {
        case curr.homeTeamGoals > curr.awayTeamGoals:
          return { ...acc, totalVictories: acc.totalVictories + 1 };
        case curr.homeTeamGoals < curr.awayTeamGoals:
          return { ...acc, totalDraws: acc.totalLosses + 1 };
        case curr.homeTeamGoals === curr.awayTeamGoals:
          return { ...acc, totalLosses: acc.totalDraws + 1 };
        default:
          break;
      }
      return acc;
    }, { totalVictories: 0, totalDraws: 0, totalLosses: 0 });
    return matchResults;
  };

  private _getTotalGoals = (matches: IMatchScore[]): ITeamGoals => {
    const teamGoals = matches.reduce((acc, curr) => {
      const goalsFavor = acc.goalsFavor + curr.homeTeamGoals;
      const goalsOwn = acc.goalsOwn + curr.awayTeamGoals;
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

  private sumStats = (home: ITeamStats, away: ITeamStats) => ({
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
