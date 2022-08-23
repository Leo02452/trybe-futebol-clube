export default interface ITeamMatches {
  goalsFavorPerMatch: number[];
  goalsOwnPerMatch: number[];
  teamHome?: {
    teamName: string;
  }
  teamAway?: {
    teamName: string;
  }
}
