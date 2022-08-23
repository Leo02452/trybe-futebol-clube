import sequelize = require('sequelize');
import Team from '../database/models/team';
import Match from '../database/models/matches';
import ITeamMatches from '../interfaces/ITeamMatches';
import ITeamInfo from '../interfaces/ITeamInfo';

export default class LeaderboardService {
  public getHome = async () => {
    const matches = await Match.findAll({
      where: { inProgress: false },
      attributes: [
        [sequelize.fn('json_arrayagg', sequelize.col('home_team_goals')), 'goalsFavorPerMatch'],
        [sequelize.fn('json_arrayagg', sequelize.col('away_team_goals')), 'goalsOwnPerMatch'],
      ],
      include: { model: Team, as: 'teamHome', attributes: ['teamName', 'id'] },
      group: ['home_team'],
    });

    const matchesJSON = matches.map((match) => match.toJSON()) as unknown as ITeamMatches[];

    const teamsInfo = matchesJSON
      .map(this.generateTeamInfo)
      .sort(this.orderByTieBreakers);

    return teamsInfo;
  };

  public getAway = async () => {
    const matches = await Match.findAll({
      where: { inProgress: false },
      attributes: [
        [sequelize.fn('json_arrayagg', sequelize.col('away_team_goals')), 'goalsFavorPerMatch'],
        [sequelize.fn('json_arrayagg', sequelize.col('home_team_goals')), 'goalsOwnPerMatch'],
      ],
      include: { model: Team, as: 'teamAway', attributes: ['teamName', 'id'] },
      group: ['away_team'],
    });

    const matchesJSON = matches.map((match) => match.toJSON()) as unknown as ITeamMatches[];

    const teamsInfo = matchesJSON
      .map(this.generateTeamInfo)
      .sort(this.orderByTieBreakers);

    return teamsInfo;
  };

  public getAll = async () => {
    const homeTeams = await this.getHome();
    const awayTeams = await this.getAway();

    const totalTeamInfo = homeTeams.map((homeTeam) => {
      const team = awayTeams.find((awayTeam) => homeTeam.name === awayTeam.name);
      if (!team) return homeTeam;
      return this.sumStats(homeTeam, team);
    });

    const leaderboard = totalTeamInfo.sort(this.orderByTieBreakers);

    return leaderboard;
  };

  private generateTeamInfo = (team: ITeamMatches) => {
    const totalGames = team.goalsFavorPerMatch.length;
    const totalVictories = this.getTotalVictories(team.goalsFavorPerMatch, team.goalsOwnPerMatch);
    const totalDraws = this.getTotalDraws(team.goalsFavorPerMatch, team.goalsOwnPerMatch);
    const totalPoints = this.getTotalPoints(totalVictories, totalDraws);
    const goalsFavor = this.getTotalGoals(team.goalsFavorPerMatch);
    const goalsOwn = this.getTotalGoals(team.goalsOwnPerMatch);

    return {
      name: team.teamHome?.teamName || team.teamAway?.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: this.getTotalLosses(team.goalsFavorPerMatch, team.goalsOwnPerMatch),
      goalsFavor,
      goalsOwn,
      goalsBalance: (goalsFavor - goalsOwn),
      efficiency: this.getEffiency(totalPoints, totalGames),
    };
  };

  private getTotalPoints = (victories: number, draws: number): number => {
    const totalPoint = (victories * 3) + draws;
    return totalPoint;
  };

  private getTotalGoals = (goals: number[]): number => {
    const totalGoals = goals.reduce((acc, curr) => acc + curr);
    return totalGoals;
  };

  private getTotalVictories = (goalsFavor: number[], goalsOwn: number[]): number => {
    const totalVictories = goalsFavor
      .reduce((acc, curr, index) => (curr > goalsOwn[index] ? acc + 1 : acc), 0);

    return totalVictories;
  };

  private getTotalDraws = (goalsFavor: number[], goalsOwn: number[]): number => {
    const totalDraws = goalsFavor
      .reduce((acc, curr, index) => (curr === goalsOwn[index] ? acc + 1 : acc), 0);

    return totalDraws;
  };

  private getTotalLosses = (goalsFavor: number[], goalsOwn: number[]): number => {
    const totalLosses = goalsFavor
      .reduce((acc, curr, index) => (curr < goalsOwn[index] ? acc + 1 : acc), 0);

    return totalLosses;
  };

  private getEffiency = (points: number, games: number): number => {
    const efficiency = Number(((points / (games * 3)) * 100).toFixed(2));
    return efficiency;
  };

  private orderByTieBreakers = (a: ITeamInfo, b: ITeamInfo) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.totalPoints === a.totalPoints) {
      if (b.totalVictories === a.totalVictories) {
        if (b.goalsBalance === a.goalsBalance) {
          if (b.goalsFavor !== a.goalsFavor) {
            return b.goalsFavor - a.goalsFavor;
          }
          return 0;
        }
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalVictories - a.totalVictories;
    }
    return 0;
  };

  private sumStats = (home: ITeamInfo, away: ITeamInfo) => ({
    name: home.name,
    totalPoints: home.totalPoints + away.totalPoints,
    totalGames: home.totalGames + away.totalGames,
    totalVictories: home.totalVictories + away.totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: home.goalsOwn + away.goalsOwn,
    goalsBalance: home.goalsBalance + away.goalsBalance,
    efficiency: this.getEffiency(
      (home.totalPoints + away.totalPoints),
      (home.totalGames + away.totalGames),
    ),
  });
}
