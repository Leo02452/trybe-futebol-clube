import Match from '../database/models/matches';
import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';

export default class MatchesService {
  public list = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };
}